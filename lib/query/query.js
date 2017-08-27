/**
 * Created by pengkun on 17/07/2017.
 */

var    util = require('util'),
    Granularity = require('../granularity/granularity'),
    Intervals = require('../interval/intervals'),
    each = require('lodash/each'),
    m = require('moment-timezone'),
    cloneDeep  =  require('lodash/cloneDeep'),
    FieldMissingError = require('../error').FieldMissingError,
    FieldEmptyError = require('../error').FieldEmptyError,
    isEmptyObject = require('../utils').isEmptyObject,
    Aggregator = require('../aggregator/aggregator'),
    PostAggregator = require('../post/postAggregator'),
    Context = require('../context'),
    Filter =  require('../filter/filter')


class Query {
    constructor(resFn, params) {
        this._query = {queryType: "", dataSource: ""}
        this.resFn = resFn == undefined ? (x) => x[0].result : resFn
        this.requiredField = ["queryType", "dataSource"]
        if (params != undefined) {
            for (let key  of Object.keys(params)) {
                this._query[key] = params[key]
            }
        }

        this._rawRes = {}
        this.aggregations = []
        this._filter = {}
        this.postAggregations = []


    }


    split(){
        let inter = this._query.intervals[0].split('/')
        if(m().toISOString() < inter[1]){
              return [null, this]
        }
        else{
            return [this, null]
        }
    }

    merge(historical, realtime){
        let result
        if(historical != undefined && historical != null)
            result  = historical
        if(result != undefined){
            if(realtime != undefined && realtime != null )
                result = result.concat(realtime)
        }
        else{
            result = realtime
        }

        return result
    }


    toJSON() {
        each(Object.keys(this._query), (key) =>{
            if(Array.isArray(this._query[key]) && this._query[key].length ==0)
                delete this._query[key]
            else if(typeof this._query[key] == 'object' && Object.keys(this._query[key]).length  == 0)
                delete this._query[key]
        })
        return this._query
    }

    validate() {
        var queryFields = Object.keys(this._query)
        for (let field of this.requiredField) {
            if (queryFields.indexOf(field) == -1)
                throw new FieldMissingError(field, this._query.queryType)
            else {
                if (this._query[field] == undefined || this._query[field] == '' ||
                    (Array.isArray(this._query[field]) && this._query[field].length == 0) ||
                    isEmptyObject(this._query[field])
                ) {
                    throw new FieldEmptyError(field, this._query.queryType)
                }
                else {
                    if (Array.isArray(this._query[field]) && typeof this._query[field][0] == 'object')
                        each(this._query[field], (ele) => ele.validate())
                    //temporarily ignore intervals object
                    else if (typeof this._query[field] == 'object' && field != 'intervals' && field != 'granularity' && field.indexOf('dimension') < 0) {
                        this._query[field].validate()
                    }

                }

            }

        }
    }

    cancel() {

    }

    exec() {

    }

    addBasicValue(name, val) {
        this._query[name] = val
    }

    parseFn(fn) {
        this.resFn = fn
    }

    parseRes(res) {
        this._rawRes = res
        return res.length > 0 ? this.resFn(res) : []
    }

    context(context) {
        if (context instanceof Context) {
            this.addBasicValue('context', context)
        }
        else if (typeof context == 'object') {
            this.addBasicValue('context', new Context(context))
        }
    }

    granularity(granularity) {
        this.addBasicValue('granularity', Granularity(granularity))
        return this
    }

    intervals(start, end) {
        this.addBasicValue('intervals', Intervals(start, end))
        return this
    }

    with(...args){
        this.fn(...args)
        return this
    }

    postAggregator(post, overwrite = false){
        if(arguments.length == 1 && typeof arguments[0] == 'object' && !Array.isArray(post)) {
            this.postAggregations.push(post)
            this.fn = function () {post.withField(...arguments)}
        }
        else if(Array.isArray(post) && !overwrite) {
            this.postAggregations.concat(post)
        }
        else if(Array.isArray(post) && overwrite) {
            Object.assign(this.postAggregattions, []), Object.assign(this.postAggregations, post)
        }
        else {
            let self = this
            post = PostAggregator(...arguments)
            this.postAggregations.push(post)
            this.fn = function (){
                post.withField(...arguments)
                if(post.field && post.field.type == 'thetaSketchSetOp')
                    self.fn = function (){post.field.withField(...arguments)}
            }
        }

        return this
    }

    aggregator(aggregator, overwrite = false) {
        if (arguments.length == 1 && typeof arguments[0] == 'object' && !Array.isArray(aggregator)) {
            this.aggregations.push(aggregator)
        }
        else if(Array.isArray(aggregator) && !overwrite)
            this.aggregations.concat(aggregator)
        else if(Array.isArray(aggregator) && overwrite)
            Object.assign(this.aggregations, []), Object.assign(this.aggregations, aggregator)
        else {
            aggregator  = Aggregator(...arguments)
            this.aggregations.push(aggregator)
        }
        if(aggregator.type == 'filtered'){
            let self = this
            this.withF = function () {
                aggregator.withF(...arguments);
                if(aggregator.filter.type == 'and' || aggregator.filter.type == 'or' || aggregator.filter.type == 'not' )
                    self.fn = function (){aggregator.filter.push(...arguments)}
                return this;
            }
            this.withG = function () {aggregator.withG(...arguments); return this;}
        }
        return this
    }

    filter(filter) {
        each(Object.keys(this._filter), (key) => delete this._filter[key])
        if (!(arguments.length === 1 && typeof arguments[0] === 'object'))
            filter = Filter(...arguments)

        Object.assign(this._filter, filter)
        this.fn = function () {filter.push(...arguments)}
        return this
    }

    remove(key) {
        delete this._query[key]
        return this
    }

    addFilter(filter, ref = false) {
        if (!(
            (arguments.length === 1 || (arguments.length === 2 && typeof arguments[1] === 'string'))
            && typeof arguments[0] === 'object')
        )
            filter = Filter(...arguments)

        if (Object.keys(this._filter).length === 0) {
            let and =  Filter('and')
                and.push(filter)
            Object.assign(this._filter, and)
        }
        else if (this._filter.type === 'and') {
            this._filter.fields.push(filter)
        }
        if (ref != false) {
            if (this.ref == undefined)
                this.ref = {}
            this.ref[ref] = filter
        }
        if(filter.type == 'and' || filter.type == 'or' || filter.type == 'not')
              this.fn = function (){filter.push(...arguments)}
        return this
    }

    retrieveFilter(ref) {
        return this.ref[ref]
    }

    clone() {
        return cloneDeep(this)
    }
}


module.exports = Query
