/**
 * Created by pengkun on 19/07/2017.
 */
module.exports = function (aggregator, val){
    return {
        type: 'equalTo',
        aggregation:aggregator,
        value: val
    }
}
