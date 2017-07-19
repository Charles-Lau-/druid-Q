/**
 * Created by pengkun on 19/07/2017.
 */
module.exports  =  function (fieldName, outputName){
    return {
         type: 'fieldAccess',
        name: outputName,
        fieldName: fieldName
    }
}
