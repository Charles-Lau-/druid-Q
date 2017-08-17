/**
 * Created by pengkun on 19/07/2017.
 */

var utils = require('../utils'),
    postAggregators =  utils.moduleMap(__dirname, 'postAggregator.js'),
    each = require('lodash/each'),
    ExpectStrFieldNotEmpty = require('../error').ExpectStrFieldNotEmpty,
    ExpectArrayFieldAndNotEmpty = require('../error').ExpectArrayFieldAndNotEmpty,
    UnexpectedFieldValueError = require('../error').UnexpectedFieldValueError

module.exports = createPostAggregator


var numericPostAggregator = ['+','-','*','/','quotient']

var comparePostAggregator = ['doubleGreatest', 'longGreatest', 'doubleLeast', 'longLeast']

function createPostAggregator(name, ...args) {
    return new postAggregators[name](...args)
}


function numericPostAggregatorGenerator(type){
    var fn = function (outputName,fields= [], ordering = null){
         this.type = 'arithmetic'
         this.outputName = outputName
         this.fn =  type
         this.fields = fields
         if(ordering != null)
            this.ordering = ordering

    }
    fn.prototype.validate = function () {
        ExpectStrFieldNotEmpty(type + ' postAggregator', this, ...['outputName', 'fn'])
        ExpectArrayFieldAndNotEmpty(type + ' postAggregator', this, 'fields')
        if(this.ordering != undefined && this.ordering != 'numericFirst')
            throw new UnexpectedFieldValueError('ordering', type + ' postaggregator', 'numericFirst' ,this.ordering)
    }
    return fn
}

function comparePostAggregatorGenerator(type){
    var fn  = function (outputName, fields= []){
         this.type = type
         this.name = outputName
         this.fields = fields
    }
    fn.prototype.validate  = function (){
        ExpectStrFieldNotEmpty(type+ ' postAggregator', this, 'name')
        ExpectArrayFieldAndNotEmpty(type + ' postAggregator', this, 'fields')
    }

    return fn
}

each(numericPostAggregator, (agg) =>{
    postAggregators[agg] = numericPostAggregatorGenerator(agg)
})

each(comparePostAggregator, (agg) =>{
    postAggregators[agg] = comparePostAggregatorGenerator(agg)
})

createPostAggregator.postAggregators =  postAggregators




