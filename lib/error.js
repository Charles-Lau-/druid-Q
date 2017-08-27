/**
 * Created by pengkun on 17/07/2017.
 */
var utils = require('./utils'),
    each = require('lodash/each'),
    forOwn = require('lodash/forOwn')

class CustomError extends Error {
    constructor(message) {
        super(message)
        Error.captureStackTrace(this, CustomError)
    }
}

class  FieldMissingError extends Error {
    constructor(fieldName, place) {
        super(`${fieldName} is missing in ${place}`)
        Error.captureStackTrace(this, FieldMissingError)
    }
}

class FieldEmptyError extends Error{
    constructor(fieldName, place) {
        super(`${fieldName} is empty in ${place}`)
        Error.captureStackTrace(this, FieldEmptyError)
    }
}

class FieldTypeMismatchError extends Error {
    constructor(fieldName, place, shouldType ){
        super(`${fieldName} in ${place}, the type should be ${shouldType}`)
        Error.captureStackTrace(this, FieldEmptyError)
    }
}

class UnexpectedFieldValueError extends Error {
    constructor(fieldName, place, shouldValue, actualValue ){
        super(`${fieldName} in ${place}, the value should be in ${shouldValue}, but it is ${actualValue}`)
        Error.captureStackTrace(this, FieldEmptyError)
    }
}

function ExpectStrFieldNotEmpty(component, self, ...args){
    each(args, (arg) =>{
        if(self[arg] === undefined) throw new FieldMissingError(arg, component)
        if(self[arg] == '') throw new FieldEmptyError(arg, component)
    })
}

function ExpectArrayFieldAndNotEmpty(component, self,...args){
     each(args, (arg) =>{
         if(!Array.isArray(self[arg])) throw new FieldTypeMismatchError(arg, component, 'array ')
         if(self[arg].length == 0) throw  new FieldEmptyError(arg, component)
     })
}

function ExpectEnumeratedValue(component, self, cond){
    forOwn(cond, (value, key) =>{
        if(value.indexOf(self[key]) == -1) throw new UnexpectedFieldValueError(key, component, value, self[key])
    })
}


exports.CustomError = CustomError
exports.FieldMissingError = FieldMissingError
exports.FieldEmptyError = FieldEmptyError
exports.FieldTypeMismatchError = FieldTypeMismatchError
exports.UnexpectedFieldValueError = UnexpectedFieldValueError
exports.ExpectStrFieldNotEmpty = ExpectStrFieldNotEmpty
exports.ExpectArrayFieldAndNotEmpty  = ExpectArrayFieldAndNotEmpty
exports.ExpectEnumeratedValue = ExpectEnumeratedValue



