/**
 * Created by pengkun on 18/07/2017.
 */
var FieldMissingError = require('../error').FieldMissingError,
    FieldEmptyError =  require('../error').FieldEmptyError

class hyperUnique{
    constructor(name, fieldName, isInputHyperUnique=false) {
        this.name = name
        this.fieldName = fieldName
        this.isInputHyperUnique= isInputHyperUnique
    }

    validate(){
        if(this.name == undefined) throw new FieldMissingError('name', 'hyperUnique aggregator')
        if(this.name == '') throw new FieldEmptyError('name', 'hyperUnique aggregator')
        if(this.fieldName == undefined) throw new FieldMissingError('fieldName', 'hyperUnique aggregator')
        if(this.fieldName == '') throw new FieldEmptyError('fieldName', 'hyperUnique aggregator')
   }
}
module.exports =  hyperUnique
