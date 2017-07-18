'use strict'

var Druid = require('./druid'),
    utils = require('./lib/utils'),
    queries = utils.moduleMap(__dirname + '/lib/query'),
    filter = require('./lib/filter/filter'),
    aggregator = require('./lib/aggregator/aggregator'),
    each = require('lodash/each')

module.exports = Druid

each(queries, (query) =>{
    Druid[query.name] =  query
})

Druid['filter'] = filter
Druid['aggregator'] = aggregator


