/**
 * Created by pengkun on 18/07/2017.
 */


var util = require('util'),
    Query = require('./query');

module.exports = TimeSeriesQuery

function TimeSeriesQuery(ds){
     Query.call(this,
         (x) => x,
         {
             dataSource: ds,
             queryType: 'timeseries',
             granularity: 'day',
             descending: true
         }
     )
    this.addBasicValue("aggregations", this.aggregations)
    this.addBasicValue("filter", this._filter)
    this.addBasicValue("postAggregations", this.postAggregations)

    this.requiredField = this.requiredField.concat(['granularity','descending','aggregations','intervals'])
}

util.inherits(TimeSeriesQuery, Query)
