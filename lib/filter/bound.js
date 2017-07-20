/**
 * Created by pengkun on 18/07/2017.
 */
var isEmtpyStr = require('../utils').isEmptyStr,
    FieldEmptyError = require('../error').FieldEmptyError,
    UnexpectedFieldValueError = require('../error').UnexpectedFieldValueError


var ORDERING = ['lexicographic', 'alphanumeric', 'numeric', 'strlen']

module.exports = function (dimension, lower, upper, lowerStrict=false, upperStrict=true, ordering='lexicographic'){
    return {
        type: 'bound',
        dimension: dimension,
        lower: lower,
        upper: upper,
        lowerStrict: lowerStrict,
        upperStrict: upperStrict,
        ordering: ordering,
        validate: function (){
              if(isEmtpyStr(this.dimension))
                  throw new FieldEmptyError('dimension', 'bound filter')
              if(isEmtpyStr(this.lower))
                 throw new FieldEmptyError('lower', 'bound filter')
              if(isEmtpyStr(this.upper))
                  throw new FieldEmptyError('upper', 'bound filter')
              if(ORDERING.indexOf(this.ordering) == -1)
                  throw new UnexpectedFieldValueError('ordering', 'bound filter', ORDERING, this.ordering)

        }
    }
}
