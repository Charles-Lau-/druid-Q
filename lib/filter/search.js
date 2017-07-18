/**
 * Created by pengkun on 18/07/2017.
 */
module.exports = function (dimension, type, val){
    return {
        type: 'search',
        dimension: dimension,
        query: {
            type: type,
            value: val
        }
    }
}
