/**
 * Created by pengkun on 18/07/2017.
 */

var FieldEmptyError = require('../error').FieldEmptyError,
    isEmptyArray = require('../../utils').isEmptyArray,
    FieldTypeMismatchError = require('../error').FieldTypeMismatchError

module.exports = function (dimension,vals=[]){
    return {
        type: 'in',
        dimension: dimension,
        values:vals,
        validate: function (){
            if(isEmtpyStr(dimension))
                throw new FieldEmptyError('dimension', 'in filter')
            if(!Array.isArray(vals))
                throw new FieldTypeMismatchError('values', 'in filter', 'array')
            if(isEmptyArray(vals))
                throw new FieldEmptyError('values', 'in filter')
        }
    }
}
