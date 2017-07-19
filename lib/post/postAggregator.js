/**
 * Created by pengkun on 19/07/2017.
 */

var utils = require('../utils'),
    postAggregators =  utils.moduleMap(__dirname, 'postAggregator.js'),
    each = require('lodash/each')

module.exports = createPostAggregator


var numericPostAggregator = ['+','-','*','/','quotient']

var comparePostAggregator = ['doubleGreatest', 'longGreatest', 'doubleLeast', 'longLeast']

function createPostAggregator(name, ...args) {
    return postAggregators[name](...args)
}


function numericPostAggregatorGenerator(type){
    return function (outputName, fields=[], ordering=null) {
        return {
            type: 'arithmetic',
            name: outputName,
            fn: type,
            fields: fields,
            ordering: ordering

       }

    }
}

function comparePostAggregatorGenerator(type){
     return function (outputName, fields = []){
         return {
             type: type,
             name: outputName,
             fields: fields
         }

     }
}

each(numericPostAggregator, (agg) =>{
    postAggregators[agg] = numericPostAggregatorGenerator(agg)
})

each(comparePostAggregator, (agg) =>{
    postAggregators[agg] = comparePostAggregatorGenerator(agg)
})





