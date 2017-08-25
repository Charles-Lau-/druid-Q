/**
 * Created by pengkun on 18/07/2017.
 */
var FieldMissingError = require('../error').FieldMissingError,
    FieldEmptyError =  require('../error').FieldEmptyError,
    FieldTypeMismatchError = require('../error').FieldTypeMismatchError



class Cardinality{
    constructor(name, fields, byRow =  false) {
        this.name = name
        this.fields = fields
        this.type = 'cardinality'
        if(byRow)
           this.byRow = byRow
    }

    validate(){
        if(this.name == undefined) throw new FieldMissingError('name', 'cardinality aggregator')
        if(this.name == '') throw new FieldEmptyError('name', 'cardinality aggregator')
        if(!Array.isArray(this.fields)) throw new FieldTypeMismatchError('fields', 'cardinality aggregator', 'array')
        if(this.fields.length == 0) throw new FieldEmptyError('fields', 'cardinality aggregator')
    }
}
module.exports  = Cardinality
