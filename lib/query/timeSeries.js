/**
 * Created by pengkun on 18/07/2017.
 */


var util = require('util'),
    Query = require('./query');
    map = require('lodash/map')


class TimeSeriesQuery extends Query{

    constructor(ds){
        super(
         (x) => x,
         {
             dataSource: ds,
             queryType: 'timeseries',
             granularity: 'day'
         }
      )
      this.addBasicValue("aggregations", this.aggregations)
      this.addBasicValue("filter", this._filter)
      this.addBasicValue("postAggregations", this.postAggregations)

      this.requiredField = this.requiredField.concat(['granularity','aggregations','intervals'])
   }

}

module.exports = TimeSeriesQuery
