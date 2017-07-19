'use strict'

var Druid = require('./druid'),
    utils = require('./lib/utils'),
    queries = utils.moduleMap(__dirname + '/lib/query'),
    aggregators = utils.moduleMap(__dirname + '/lib/aggregator'),
    filters = utils.moduleMap(__dirname + '/lib/filter'),
    posts = utils.moduleMap(__dirname + '/lib/post'),
    having = utils.moduleMap(__dirname + '/lib/having'),
    each = require('lodash/each')

module.exports = Druid

each(queries, (query) =>{
    Druid[query.name] =  (ds) => new query(ds)
})





