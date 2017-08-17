/**
 * Created by pengkun on 17/08/2017.
 */
var ExpectStrFieldNotEmpty = require('../error').ExpectStrFieldNotEmpty

class ThetaSketch{
    constructor(name, fieldName, isInputThetaSketch=false, size=16384){
            this.type = 'thetaSketch'
            this.name = name
            this.fieldName = fieldName
            if(isInputThetaSketch)
                this.isInputThetaSketch = isInputThetaSketch
            if(size != 16384)
                this.size = size
    }
    validate(){
        ExpectStrFieldNotEmpty('thetaSketch aggregator', this, ...['name', 'fieldName'])
    }
}
module.exports = ThetaSketch
