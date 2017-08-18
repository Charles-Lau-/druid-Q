/**
 * Created by pengkun on 19/07/2017.
 */
var ExpectStrFieldNotEmpty = require('../error').ExpectStrFieldNotEmpty,
    FieldTypeMismatchError = require('../error').FieldTypeMismatchError,
    FieldMissingError = require('../error').FieldMissingError

class ThetaSketchEstimate{
    constructor(outputName, op){
        this.type = 'thetaSketchEstimate'
        this.name = outputName
        this.field = op
    }
    validate() {
        ExpectStrFieldNotEmpty('thetaSketchEstimate postAggregator', this, 'name')
        if(this.field == undefined)  throw new FieldMissingError('field', 'thetaSketchEstimate postAggregator')
        if((typeof this.field) != 'object') throw new FieldTypeMismatchError('field', 'thetaSketchEstimate postAggregator', 'object')
        this.field.validate()

    }
}
module.exports =  ThetaSketchEstimate
