/**
 * Created by pengkun on 17/07/2017.
 */

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

exports.CustomError = CustomError
exports.FieldMissingError = FieldMissingError
exports.FieldEmptyError = FieldEmptyError
exports.FieldTypeMismatchError = FieldTypeMismatchError
exports.UnexpectedFieldValueError = UnexpectedFieldValueError




