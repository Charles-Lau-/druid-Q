/**
 * Created by pengkun on 19/07/2017.
 */
var ExpectStrFieldNotEmpty = require('../error').ExpectStrFieldNotEmpty

class FieldAccess {
    constructor(fieldName, outputName){
        this.type = 'fieldAccess'
        this.fieldName = fieldName
        this.name = outputName
    }
    validate() {
        ExpectStrFieldNotEmpty('fieldAccess postAggregator', this, ...['fieldName', 'name'])
    }
}
module.exports   = FieldAccess
