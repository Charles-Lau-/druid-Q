var utils = require('../utils'),
    aggregators =  utils.moduleMap(__dirname, 'aggregator.js'),
    each = require('lodash/each'),
    FieldMissingError = require('../error').FieldMissingError,
    FieldEmptyError =  require('../error').FieldEmptyError

module.exports = createAggregator


var simpleAggregator = ['count', 'longSum', 'doubleSum', 'longMin', 'longMax', 'doubleMin', 'doubleMax', 'doubleFirst',
                        'doubleLast', 'longFirst', 'longLast', 'thetaSketch']



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
        if(this.name == undefined) throw new FieldMissingError('name', type + ' aggregator')
        if(this.name == '') throw new FieldEmptyError('name', type + ' aggregator')
        if(type != 'count') {
            if (this.fieldName == undefined) throw new FieldMissingError('fieldName', type + ' aggregator')
            if (this.fieldName == '') throw new FieldEmptyError('fieldName', type + ' aggregator')
        }
    }
    return fn

}


each(simpleAggregator, (agg) =>{
    aggregators[agg] = simpleAggregatorGenerator(agg)
})



