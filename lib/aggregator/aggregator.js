var utils = require('../utils'),
    aggregators =  utils.moduleMap(__dirname, 'aggregator.js'),
    each = require('lodash/each')

module.exports = createAggregator


var simpleAggregator = ['count', 'longSum', 'doubleSum', 'longMin', 'longMax', 'doubleMin', 'doubleMax', 'doubleFirst',
                        'doubleLast', 'longFirst', 'longLast']


function createAggregator(name, ...args) {
     return aggregators[name](...args)
}

function simpleAggregatorGenerator(type){
    return function (name='count', fieldName) {
        if(fieldName == undefined)
            return {
                type: type,
                name: name
            }
        else
           return {
                type:type,
                name:name,
                fieldName: fieldName
            }

    }


}


each(simpleAggregator, (agg) =>{
    aggregators[agg] = simpleAggregatorGenerator(agg)
})



