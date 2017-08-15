/**
 * Created by pengkun on 17/07/2017.
 */

var    util = require('util'),
    Granularity = require('../granularity/granularity'),
    Intervals = require('../interval/intervals'),
    each = require("lodash/each"),
    cloneDeep  =  require('lodash/cloneDeep'),
    FieldMissingError = require('../error').FieldMissingError,
    FieldEmptyError = require('../error').FieldEmptyError,
    isEmptyObject = require('../utils').isEmptyObject,
    Aggregator = require('../aggregator/aggregator'),
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

    toJSON() {
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
                    else if (typeof this._query[field] == 'object' && field != 'intervals') {
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

    aggregator(aggregator, overwrite = false) {
        if (arguments.length == 1 && typeof arguments[0] == 'object' && !Array.isArray(aggregator)) {
            this.aggregations.push(aggregator)
        }
        else if(Array.isArray(aggregator) && !overwrite)
            this.aggregations.concat(aggregator)
        else if(Array.isArray(aggregator) && overwrite)
            Object.assign(this.aggregations, []), Object.assign(this.aggregations, aggregator)
        else
            this.aggregations.push(Aggregator(...arguments))
        return this
    }

    filter(filter) {
        each(Object.keys(this._filter), (key) => delete this._filter[key])
        if (!(arguments.length === 1 && typeof arguments[0] === 'object'))
            filter = Filter(...arguments)

        Object.assign(this._filter, filter)
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

        if (Object.keys(this._filter).length === 0)
            Object.assign(this._filter, Filter('and').push(filter))
        else if (this._filter.type === 'and') {
            this._filter.fields.push(filter)
        }
        if (ref != false) {
            if (this.ref == undefined)
                this.ref = {}
            this.ref[ref] = filter
        }
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
