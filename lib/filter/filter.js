/**
 * Created by pengkun on 18/07/2017.
 */

var utils = require('../utils'),
    filters =  utils.moduleMap(__dirname, 'filter.js'),
    each = require('lodash/each')


module.exports  =  createFilter

function createFilter(name, ...args) {
    return filters[name](...args)
}






