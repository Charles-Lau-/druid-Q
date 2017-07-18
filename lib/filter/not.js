/**
 * Created by pengkun on 18/07/2017.
 */
module.exports = function (filter){
    return {
        type: 'not',
        field: filter
    }
}

