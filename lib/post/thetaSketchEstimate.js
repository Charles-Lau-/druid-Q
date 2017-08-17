/**
 * Created by pengkun on 19/07/2017.
 */
var ExpectStrFieldNotEmpty = require('../error').ExpectStrFieldNotEmpty

class ThetaSketchEstimate{
    constructor(outputName, op){
        this.type = 'thetaSketchEstimate'
        this.name = outputName
        this.field = op
    }
    validate() {
        ExpectStrFieldNotEmpty('thetaSketchEstimate postAggregator', this, 'name')
        this.field.validate()

    }
}
module.exports =  ThetaSketchEstimate
