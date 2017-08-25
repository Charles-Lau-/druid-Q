/**
 * Created by pengkun on 19/07/2017.
 */
var ExpectStrFieldNotEmpty = require('../error').ExpectStrFieldNotEmpty,
    ExpectArrayFieldAndNotEmpty = require('../error').ExpectArrayFieldAndNotEmpty,
    ExpectEnumeratedValue = require('../error').ExpectEnumeratedValue,
    FieldTypeMismatchError = require('../error').FieldTypeMismatchError,
    each = require('lodash/each')

class ThetaSketchSetOp{
    constructor(outputName, op, fields=[], size=16384){
        this.type = 'thetaSketchSetOp'
        this.name = outputName
        this.func = op
        this.fields = fields
        if(size != 16384)
            this.size = size
    }
    withField(){
        var createPostAggregator = require('./postAggregator')
        if(arguments.length == 1 && typeof arguments[0] == 'object')
            this.fields.push(arguments[0])
        else
            this.fields.push(createPostAggregator(...arguments))
        return this
    }

    withFields(fs) {
        Object.assign(this.fields,[]), Object.assign(this.fields, fs)
        return this
    }

    validate() {
        ExpectStrFieldNotEmpty('thetaSketchSetOp postAggregator', this, ...['name', 'func'])
        ExpectEnumeratedValue('thetaSketchSetOp postAggregator', this, {'func': OPERATION})
        ExpectArrayFieldAndNotEmpty('thetaSketchSetOp postAggregator', this, 'fields')
        each(this.fields, (field) =>{
            if(typeof field != 'object') throw new FieldTypeMismatchError('fields', ' thetaSketchSetOp', 'object')
            field.validate()
        })

    }
}
OPERATION = ['UNION', 'INTERSECT', 'NOT']
module.exports = ThetaSketchSetOp
