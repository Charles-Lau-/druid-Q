/**
 * Created by pengkun on 19/07/2017.
 */
var ExpectStrFieldNotEmpty = require('../error').ExpectStrFieldNotEmpty,
    ExpectArrayFieldAndNotEmpty = require('../error').ExpectArrayFieldAndNotEmpty,
    each = require('lodash/each')

class ThetaSketchSetOp{
    constructor(outputName, op, fields=[]){
        this.type = 'thetaSketchSetOp'
        this.name = outputName
        this.func = op
        this.fields = fields
    }

    validate() {
        ExpectStrFieldNotEmpty('thetaSketchSetOp postAggregator', this, ...['name', 'func'])
        ExpectArrayFieldAndNotEmpty('thetaSketchSetOp postAggregator', this, 'fields')
        each(this.fields, (field) =>{
            field.validate()
        })

    }
}
module.exports = ThetaSketchSetOp
