/**
 * Created by pengkun on 17/07/2017.
 */


var util = require('util'),
      Query = require('./query');

module.exports = DataSourceMetaData

function DataSourceMetaData(ds){
      Query.call(this,
                 (res) => res[0].result.maxIngestedEventTime,
                 {
                   dataSource: ds,
                   queryType: 'dataSourceMetadata'
                 }
               )
}

util.inherits(DataSourceMetaData, Query)

