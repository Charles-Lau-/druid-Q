/**
 * Created by pengkun on 19/07/2017.
 */

module.exports = function (aggregator, val){
       return {
           type: 'greaterThan',
            aggregation: aggregator,
           value:val
       }
}
