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

module.exports = Query


function Query(resFn, params){
    this._query = {queryType:"", dataSource:""}
    this.resFn = resFn == undefined? (x) => x[0].result : resFn
    this.requiredField = ["queryType","dataSource"]
    if(params != undefined){
        for(let key  of Object.keys(params)){
           this._query[key] = params[key]
        }
    }

    this._rawRes = {}
    this.aggregations = []
    this._filter = {}
    this.postAggregations = []


}



Query.prototype.toJSON =  function (){
       return this._query
}

Query.prototype.validate = function (){
        var queryFields =  Object.keys(this._query)
        for(let field of this.requiredField){
            if(queryFields.indexOf(field) == -1)
                 throw new FieldMissingError(field, this._query.queryType)
            else {
                if(this._query[field] == undefined || this._query[field] == '' ||
                   (Array.isArray(this._query[field]) && this._query[field].length == 0) ||
                    isEmptyObject(this._query[field])
                  ){
                    throw new FieldEmptyError(field, this._query.queryType)
                }
                else{
                    if(Array.isArray(this._query[field]) && typeof this._query[field][0] == 'object')
                     each(this._query[field], (ele) => ele.validate())
                    //temporarily ignore intervals object
                    else if(typeof this._query[field] == 'object'  && field != 'intervals') {
                        this._query[field].validate()
                    }

                }

            }

        }
}

Query.prototype.cancel = function (){

}

Query.prototype.exec = function (){

}

Query.prototype.addBasicValue = function (name, val){
    this._query[name] = val
}

Query.prototype.parseFn =  function (fn){
    this.resFn = fn
}
Query.prototype.parseRes = function (res){
    this._rawRes = res
    return res.length > 0? this.resFn(res): []
}

Query.prototype.context = function (context){
      if(context instanceof Context){
          this.addBasicValue('context', context)
      }
      else if(typeof context == 'object'){
          this.addBasicValue('context', new Context(context))
      }
}

Query.prototype.granularity=  function (granularity){
     this.addBasicValue('granularity', Granularity(granularity))
     return this
}

Query.prototype.intervals =  function (start, end){
      this.addBasicValue('intervals', Intervals(start, end))
      return this
}

Query.prototype.aggregator = function (aggregator){
      if(arguments.length == 1 && typeof arguments[0] == 'object'){
          this.aggregations.push(aggregator)
      }
      else
          this.aggregations.push(Aggregator(...arguments))
      return this
}

Query.prototype.filter = function (filter){
      each(Object.keys(this._filter), (key) => delete this._filter[key])
      if(!(arguments.length === 1 && typeof arguments[0] === 'object'))
          filter = Filter(...arguments)

      Object.assign(this._filter, filter)
      return this
}

Query.prototype.remove = function(key){
    delete this._query[key]
    return this
}

Query.prototype.addFilter = function (filter, ref=false){
       if(!(
           (arguments.length === 1 || (arguments.length ===2 && typeof arguments[1] ==='string'))
           && typeof arguments[0] === 'object')
       )
            filter = Filter(...arguments)

       if(Object.keys(this._filter).length === 0)
            Object.assign(this._filter,Filter('and').push(filter))
       else if(this._filter.type === 'and'){
            this._filter.fields.push(filter)
           }
       if(ref != false){
           if(this.ref == undefined)
               this.ref ={ref:filter}
           else
               this.ref[ref] = filter
       }
       return this
}

Query.prototype.retrieveFilter = function (ref) {
     return this.ref[ref]
}
Query.prototype.clone =  function (){
       return cloneDeep(this)
}


