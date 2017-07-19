/**
 * Created by pengkun on 19/07/2017.
 */
module.exports = function (havings) {
    return {
        type: 'or',
        havingSpecs: havings
    }

}
