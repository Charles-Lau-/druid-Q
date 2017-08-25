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

    withField(){
        var createPostAggregator = require('./postAggregator')
         if(arguments.length == 1 && typeof arguments[0] == 'object')
             this.field = arguments[0]
         else
             this.field = createPostAggregator(...arguments)
         return this
    }

    validate() {
        ExpectStrFieldNotEmpty('thetaSketchEstimate postAggregator', this, 'name')
        if(this.field == undefined)  throw new FieldMissingError('field', 'thetaSketchEstimate postAggregator')
        if((typeof this.field) != 'object') throw new FieldTypeMismatchError('field', 'thetaSketchEstimate postAggregator', 'object')
        this.field.validate()

    }
}
module.exports =  ThetaSketchEstimate
