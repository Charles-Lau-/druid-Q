/**
 * Created by pengkun on 19/07/2017.
 */
var util = require('util'),
    Query = require('./query'),
    map = require('lodash/map'),
    LimitSpec = require('../limitSpec').LimitSpec


module.exports = GroupByQuery

function GroupByQuery(ds){
    Query.call(this,
        (x) => map(x, (ele) => ele.event),
        {
            dataSource: ds,
            queryType: 'groupBy',
            granularity: 'all',
            limitSpec: new LimitSpec()
        }
    )
    this.addBasicValue("aggregations", this.aggregations)
    this.addBasicValue("filter", this._filter)
    this.addBasicValue("postAggregations", this.postAggregations)

    this.dimensions = []
    this.addBasicValue("dimensions", this.dimensions)

    this.having = {}

    this.requiredField = this.requiredField.concat(['granularity','limitSpec','aggregations','intervals'])


}

GroupByQuery.prototype.dimensions= function (dimension){
    this.dimensions.push(dimension)
    return this
}

GroupByQuery.prototype.setDimension = function (dimensions){
    this.dimensions.length = 0
    Object.assign(this.dimensions, dimensions)
    return this
}

GroupByQuery.prototype.having= function (having){
    this.having = having
}

GroupByQuery.prototype.toJSON =  function (){
    if(Object.keys(this.having).length != 0)
        this.addBasicValue("having", this.having)
    return this._query
}

util.inherits(GroupByQuery, Query)
