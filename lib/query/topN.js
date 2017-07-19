/**
 * Created by pengkun on 19/07/2017.
 */

var util = require('util'),
    Query = require('./query');

module.exports = TopNQuery

function TopNQuery(ds){
    Query.call(this,
        (x) => x[0].result,
        {
            dataSource: ds,
            queryType: 'topN',
            granularity: 'all',
            descending: true,
            threshold: 100000
        }
    )
    this.addBasicValue("aggregations", this.aggregations)
    this.addBasicValue("filter", this.filter)
    this.addBasicValue("postAggregations", this.postAggregations)



}

TopNQuery.prototype.dimension= function (dimension){
     this.addBasicValue('dimension', dimension)
     return this
}

TopNQuery.prototype.metric = function (metric){
    this.addBasicValue('metric', metric)
    return this
}

TopNQuery.prototype.limit =  function (limit){
    this.addBasicValue("threshold", limit)
    return this
}

util.inherits(TopNQuery, Query)
