/**
 * Created by pengkun on 19/07/2017.
 */
module.exports = function (outputName, fieldNames = [], fn){
    return {
         type: 'javascript',
         name: outputName,
         fieldNames: fieldNames,
         'function': fn
    }

}
