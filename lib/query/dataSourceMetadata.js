/**
 * Created by pengkun on 17/07/2017.
 */


var util = require('util'),
      Query = require('./query');


class  DataSourceMetaData extends Query{
    constructor(ds) {
        super(
            (res) => res[0].result.maxIngestedEventTime,
            {
                dataSource: ds,
                queryType: 'dataSourceMetadata'
            }
        )
    }
}



module.exports = DataSourceMetaData
