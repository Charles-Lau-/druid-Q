/**
 * Created by pengkun on 18/07/2017.
 */
var FieldEmptyError = require('../error').FieldEmptyError,
    isEmptyArray = require('../../utils').isEmptyArray

module.exports = function (dimension, fun){
    return {
        type: 'javascript',
        dimension: dimension,
        function:fun,
        validate: function (){

        }
    }
}

