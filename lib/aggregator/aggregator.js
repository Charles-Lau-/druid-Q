var utils = require('../utils'),
    aggregators =  utils.moduleMap(__dirname, 'aggregator.js'),
    each = require('lodash/each'),
    ExpectStrFieldNotEmpty = require('../error').ExpectStrFieldNotEmpty

module.exports = createAggregator


var simpleAggregator = ['count', 'longSum', 'doubleSum', 'longMin', 'longMax', 'doubleMin', 'doubleMax', 'doubleFirst',
                        'doubleLast', 'longFirst', 'longLast']



function createAggregator(name, ...args) {
     return new aggregators[name](...args)
}

function simpleAggregatorGenerator(type){
    var fn = function (name='count', fieldName) {
          this.type = type
          this.name = name
          if(type != 'count')
              this.fieldName = fieldName

        }


    fn.prototype.validate =  function () {
        if(type != 'count')
            ExpectStrFieldNotEmpty(type + ' aggregator', this, ...['name', 'fieldName'])
        else
            ExpectStrFieldNotEmpty(type + ' aggregator', this, 'name')

    }
    return fn

}


each(simpleAggregator, (agg) =>{
    aggregators[agg] = simpleAggregatorGenerator(agg)
})

createAggregator.aggregators = aggregators

