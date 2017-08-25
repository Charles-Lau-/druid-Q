/**
 * Created by pengkun on 18/07/2017.
 */
var ExpectStrFieldNotEmpty = require('../error').ExpectStrFieldNotEmpty

class HyperUnique{
    constructor(name, fieldName, isInputHyperUnique=false) {
        this.type = 'hyperUnique'
        this.name = name
        this.fieldName = fieldName
        if(isInputHyperUnique)
            this.isInputHyperUnique= isInputHyperUnique
    }

    validate(){
        ExpectStrFieldNotEmpty('hyperUnique aggregator', this, ...['name', 'fieldName'])
   }
}
module.exports =  HyperUnique
