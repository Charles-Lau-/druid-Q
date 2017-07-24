/**
 * Created by pengkun on 18/07/2017.
 */

var ExpectStrFieldNotEmpty = require('../error').ExpectStrFieldNotEmpty,
    ExpectArrayFieldAndNotEmpty = require('../error').ExpectArrayFieldAndNotEmpty,
    ExpectEnumeratedValue = require('../error').ExpectEnumeratedValue,
    FieldTypeMismatchError = require('../error').FieldTypeMismatchError,
    utils = require('../utils'),
    filters =  utils.moduleMap(__dirname, 'filter.js'),
    each = require('lodash/each'),
    forOwn = require('lodash/forOwn')


var VALIDATION_STR_NOT_EMPTY = {
    selector: ['dimension','value'],
    bound: ['dimension','lower', 'upper'],
    in: ['dimension'],
    javascript: ['dimension', 'function'],
    like: ['dimension', 'pattern'],
    regex: ['dimension', 'pattern'],
    search: ['dimension'],
    not: ['field']
}

var VALIDATION_ARRAY_NOT_EMPTY = {
    or: ['fields'],
    and: ['fields'],
    in: ['values'],
    interval:['intervals']
}

var VALIDATION_VALUES = {
    bound: {'ordering': filters.bound.ORDERING}
}

var NESTED_VALIDATION = {
    and: 'fields',
    or: 'fields',
    not: 'field',
}


module.exports  =  createFilter

function createFilter(name, ...args) {
    return new filters[name](...args)
}

(function wrapValidation() {
    forOwn(filters, (filter, filterName) =>{
        filter.prototype.validate = function (){
            if(VALIDATION_STR_NOT_EMPTY[filterName] !=  undefined)
                ExpectStrFieldNotEmpty(filterName + ' filter', this , ...VALIDATION_STR_NOT_EMPTY[filterName])
            if(VALIDATION_ARRAY_NOT_EMPTY[filterName] != undefined)
                ExpectArrayFieldAndNotEmpty(filterName + ' filter', this, ...VALIDATION_ARRAY_NOT_EMPTY[filterName])
            if(VALIDATION_VALUES[filterName] != undefined)
                ExpectEnumeratedValue(filterName + ' filter', this, VALIDATION_VALUES[filterName])
            if(NESTED_VALIDATION[filterName] != undefined)
                if(Array.isArray(this[NESTED_VALIDATION[filterName]]))
                    each(this[NESTED_VALIDATION[filterName]], (f) => f.validate())
                else {
                    this[NESTED_VALIDATION[filterName]].validate()
                }
            if(filterName === 'bound'){
                if(!(/\d{10}/.test(this.upper))) throw new FieldTypeMismatchError('upper', 'bound filter', 'timestamp')
                if(!(/\d{10}/.test(this.lower))) throw new FieldTypeMismatchError('lower', 'bound filter', 'timestamp')
                if(typeof this.lowerStrict !== 'boolean') throw new FieldTypeMismatchError('lowerStrict', 'bound filter', 'boolean')
                if(typeof this.upperStrict !== 'boolean') throw new FieldTypeMismatchError('upperStrict', 'bound filter', 'boolean')
            }
        }
    })
})()






