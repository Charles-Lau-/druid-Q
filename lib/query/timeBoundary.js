/**
 * Created by pengkun on 18/07/2017.
 */

var util = require('util'),
    Query = require('./query');

module.exports = TimeBoundaryQuery

function TimeBoundaryQuery(ds){
    Query.call(this,
        (res) => res[0].result.maxIngestedEventTime,
        {
            dataSource: ds,
            queryType: 'timeBoundary'
        }
    )
}

util.inherits(TimeBoundaryQuery, Query)

