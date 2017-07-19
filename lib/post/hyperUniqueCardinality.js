/**
 * Created by pengkun on 19/07/2017.
 */
module.exports = function (fieldName){
    return {
          type: 'hyperUniqueCardinality',
        fieldName: fieldName
    }

}
