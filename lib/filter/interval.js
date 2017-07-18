/**
 * Created by pengkun on 18/07/2017.
 */
module.exports = function (intervals=[]){
    return {
        type: 'interval',
        dimension: '__time',
        intervals:intervals
    }
}
