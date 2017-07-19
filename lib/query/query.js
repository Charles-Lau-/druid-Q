/**
 * Created by pengkun on 17/07/2017.
 */

var EventEmitter = require('events').EventEmitter,
    util = require('util'),
    Granularity = require('../granularity/granularity'),
    Intervals = require('../interval/intervals'),
    each = require("lodash/each"),
    Aggregator = require('../aggregator/aggregator')
    Filter =  require('../filter/filter')

module.exports = Query


function Query(resFn, params){
    EventEmitter.call(this)
    this.setMaxListeners(0)
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

util.inherits(Query, EventEmitter)


Query.prototype.toJSON =  function (){
       return this._query
}

Query.prototype.validate = function (){
        var queryFields =  Object.keys(this._query)
        for(let field in this.requiredField){
            if(!(field in queryFields))
                return false
        }
        return true
}

Query.prototype.cancel = function (){

}

Query.prototype.exec = function (){

}

Query.prototype.addBasicValue = function (name, val){
    this._query[name] = val
}

Query.prototype.parseRes = function (res){
    this._rawRes = res
    return res.length > 0? this.resFn(res): {}
}


Query.prototype.granularity=  function (granularity){
     this.addBasicValue('granularity', Granularity(granularity))
     return this
}

Query.prototype.interval =  function (start, end){
      this.addBasicValue('intervals', Intervals(start, end))
      return this
}

Query.prototype.aggregator = function (aggregator){
      if(arguments.length === 1 && typeof arguments[0] === 'object'){
          this.aggregations.push(aggregator)
      }
      else
          this.aggregations.push(Aggregator(...arguments))
      return this
}

Query.prototype.filter = function (filter){
      if(arguments.length === 1 && typeof arguments[0] === 'object') {
          each(Object.keys(this._filter), (key) => delete this._filter[key])
          Object.assign(this._filter, filter)
      }
      else
          this._filter = Filter(...arguments)
      return this
}

Query.prototype.addFilter = function (filter){
       if(!(arguments.length === 1 && typeof arguments[0] === 'object'))
            filter = Filter(...arguments)

       if(Object.keys(this._filter).length === 0)
           this._filter = Filter('and').push(filter)
       else if(Object.keys(this._filter)[0].type === 'and')
           this._filter[0].fields.push(filter)
       return this
}


