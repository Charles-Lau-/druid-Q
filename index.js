'use strict'

var Druid = require('./druid'),
    utils = require('./lib/utils'),
    queries = utils.moduleMap(__dirname + '/lib/query'),
    aggregators = utils.moduleMap(__dirname + '/lib/aggregator'),
    filters = utils.moduleMap(__dirname + '/lib/filter'),
    posts = utils.moduleMap(__dirname + '/lib/post'),
    havings = utils.moduleMap(__dirname + '/lib/having'),
    each = require('lodash/each')


each(queries, (query) =>{
    Druid[query.name] =  (ds) => new query(ds)
})


exports.Druid = Druid
exports.Aggregators = aggregators
exports.Filters = filters
exports.Post = posts
exports.Havings = havings






