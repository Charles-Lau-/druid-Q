'use strict'

var Druid = require('./druid'),
    utils = require('./lib/utils'),
    queries = utils.moduleMap(__dirname + '/lib/query'),
    each = require('lodash/each')

module.exports = Druid

each(queries, (query) =>{
    Druid[query.name] =  query
})



