/**
 * Created by pengkun on 18/07/2017.
 */
var FieldEmptyError = require('../error').FieldEmptyError,
    isEmptyArray = require('../../utils').isEmptyArray,
    FieldTypeMismatchError = require('../error').FieldTypeMismatchError

module.exports = function (intervals=[]){
    return {
        type: 'interval',
        dimension: '__time',
        intervals:intervals,
        validate: function (){
             if(!Array.isArray(this.intervals))
                 throw new FieldTypeMismatchError('intervals', 'interval filter', '[start/end]')
             if(isEmptyArray(this.intervals))
                 throw new FieldEmptyError('intervals', 'interval filter')

        }
    }
}
