/**
 * Created by pengkun on 18/07/2017.
 */
module.exports = function (dimension, pattern){
    return {
        type: 'like',
        dimension: dimension,
        pattern: pattern
    }
}
