var utils = require('../utils'),
    aggregators =  utils.moduleMap(__dirname, 'aggregator.js'),
    each = require('lodash/each')

module.exports = createAggregator



function createAggregator(name, ...args) {
     return aggregators[name](...args)
}




