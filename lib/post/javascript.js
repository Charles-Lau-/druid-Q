/**
 * Created by pengkun on 19/07/2017.
 */

var ExpectStrFieldNotEmpty = require('../error').ExpectStrFieldNotEmpty,
    ExpectArrayFieldAndNotEmpty = require('../error').ExpectArrayFieldAndNotEmpty


class JavaScript {
    constructor(outputName, fn, fieldNames = []){
        this.type = 'javascript'
        this.name = outputName
        this.fieldNames = fieldNames
        this.function = fn
    }
    validate() {
        ExpectStrFieldNotEmpty('javascript postAggregator', this, ...['name', 'function'])
        ExpectArrayFieldAndNotEmpty('javascript postAggregator', this, 'fieldNames')

    }
}
module.exports  = JavaScript
