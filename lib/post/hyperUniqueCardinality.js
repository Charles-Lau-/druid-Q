/**
 * Created by pengkun on 19/07/2017.
 */
var ExpectStrFieldNotEmpty = require('../error').ExpectStrFieldNotEmpty

class HyperUniqueCardinality{
    constructor(fieldName){
        this.type = 'hyperUniqueCardinality'
        this.fieldName = fieldName
    }
    validate() {
        ExpectStrFieldNotEmpty('hyperUniqueCardinality postAggregator', this, 'fieldName')
    }

}
module.exports  = HyperUniqueCardinality
