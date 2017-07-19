/**
 * Created by pengkun on 19/07/2017.
 */

var utils = require('../utils'),
    aggregators =  utils.moduleMap(__dirname, 'having.js'),
    each = require('lodash/each')

module.exports  =  createHaving

function createHaving(name, ...args) {
    return filters[name](...args)
}
