/**
 * Created by pengkun on 18/07/2017.
 */

var util = require('util'),
    Query = require('./query');


class TimeBoundaryQuery extends Query {
    constructor(ds) {
        super(
            (res) => res[0].result.maxIngestedEventTime,
            {
                dataSource: ds,
                queryType: 'timeBoundary'
            }
        )
    }
}


module.exports = TimeBoundaryQuery
