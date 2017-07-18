/**
 * Created by pengkun on 17/07/2017.
 */

var EventEmitter = require('events').EventEmitter,
    util = require('util'),
    Granularity = require('../granularity/granularity'),
    Intervals = require('../interval/intervals'),
    each = require("lodash/each"),
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
    this.filter = {}
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


Query.prototype.setGranularity =  function (granularity){
     this.addBasicValue('granularity', Granularity(granularity))
     return this
}

Query.prototype.setInterval =  function (start, end){
      this.addBasicValue('intervals', Intervals(start, end))
    return this
}

Query.prototype.addAggregator = function (aggregator){
      this.aggregations.push(aggregator)
      return this
}

Query.prototype.setFilter = function (filter){
      each(Object.keys(this.filter), (key) => delete this.filter[key])
      Object.assign(this.filter, filter)
      return this
}

Query.prototype.addFilter = function (filter){
       if(Object.keys(this.filter).length === 0)
           this.filter = Filter('and').push(filter)
       else if(Object.keys(this.filter)[0].type === 'and')
           this.filter[0].fields.push(filter)
       return this
}


