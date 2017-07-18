/**
 * Created by pengkun on 18/07/2017.
 */
module.exports = function (name, fieldName, isInputHyperUnique=false){
    return {
        name: name,
        fieldName: fieldName,
        isInputHyperUnique: isInputHyperUnique
    }
}
