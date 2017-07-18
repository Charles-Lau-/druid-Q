/**
 * Created by pengkun on 18/07/2017.
 */
module.exports = function (dimension, lower, upper, lowerStrict=false, upperStrict=true, ordering='lexicographic'){
    return {
        type: 'bound',
        dimension: dimension,
        lower: lower,
        upper: upper,
        lowerStrict: lowerStrict,
        upperStrict: upperStrict,
        ordering: ordering
    }
}
