/**
 * Created by pengkun on 18/07/2017.
 */

each = require("lodash/each"),
    FieldEmptyError = require('../error').FieldEmptyError,
    isEmptyArray = require('../../utils').isEmptyArray,
    FieldTypeMismatchError = require('../error').FieldTypeMismatchError

module.exports = function (fields = []){
    return {
        type: 'and',
        fields: fields,
        push:  function (filter) {this.fields.push(filter); return this;},
        validate: function (){
            if(!Array.isArray(this.fields)) throw new FieldTypeMismatchError('fields', 'and filter', 'array')
            if(isEmptyArray(this.fields)) throw new FieldEmptyError('fields', 'and filter')
            each(fields, (field) => field.validate())
        }
    }
}
