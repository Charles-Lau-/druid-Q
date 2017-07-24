/**
 * Created by pengkun on 21/07/2017.
 */
var _ = require('lodash'),
    ExpectStrFieldNotEmpty = require('./error').ExpectStrFieldNotEmpty,
    ExpectEnumeratedValue = require('./error').ExpectEnumeratedValue
    UnexpectedFieldValueError = require('./error').UnexpectedFieldValueError

class LimitSpec{
   constructor(limit = 1000000, columns = []){
        this.type = 'default'
        this.limit  =  limit
        if(columns.length > 0)
            this.columns = columns
   }
   push(...orderByColumnSpec){
       if(orderByColumnSpec.length == 1 && orderByColumnSpec[0] instanceof OrderByColumnSpec)
             this.columns.push(orderByColumnSpec)
       else if(orderByColumnSpec.length > 1 && typeof orderByColumnSpec[0] == 'string')
            this.columns.push(new OrderByColumnSpec(...orderByColumnSpec))
       return this
   }
   validate(){
       if(!_.isNumber(this.limit)) throw UnexpectedFieldValueError('limit', 'limitSpec', 'integer', typeof this.limit)
       _.each(this.columns, (col)=>{
           col.validate()
       })
   }
}

class OrderByColumnSpec{
    constructor(dimension, direction, dimensionOrder){
        this.dimension = dimension
        this.direction = direction
        this.dimensionOrder =dimensionOrder
    }
    validate () {
        ExpectStrFieldNotEmpty('orderByColumnSpec', this, ['dimension', 'direction'])
        ExpectEnumeratedValue('orderByColumnSpec', this, {
                                                           direction: ['ascending', 'descending']
                                                         })
        if(this.dimensionOrder != undefined)
            ExpectEnumeratedValue('orderByColumnSpec', this, {
                                                           dimensionOrder: ['lexicographic', 'alphanumeric', 'strlen', 'numeric']
                                                         })


    }
}

exports.LimitSpec = LimitSpec
exports.OrderByColumnSpec = OrderByColumnSpec
