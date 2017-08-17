'use strict'

var Druid = require('./druid'),
    utils = require('./lib/utils'),
    queries = utils.moduleMap(__dirname + '/lib/query'),
    aggregators = utils.moduleMap(__dirname + '/lib/aggregator'),
    filters = utils.moduleMap(__dirname + '/lib/filter', 'filter'),
    posts = utils.moduleMap(__dirname + '/lib/post'),
    havings = utils.moduleMap(__dirname + '/lib/having'),
    each = require('lodash/each')


each(queries, (query) =>{
    Druid[query.name] =  (ds) => new query(ds)
})



each(Object.keys(aggregators.aggregator.aggregators), (key) =>{
    aggregators[key] = aggregators.aggregator.aggregators[key]
})

each(Object.keys(posts.postAggregator.postAggregators), (key) =>{
    posts[key] = posts.postAggregator.postAggregators[key]
})

delete aggregators.aggregator

exports.Druid = Druid
exports.Aggregators = aggregators
exports.Filters = filters
exports.Queries = queries
exports.Post = posts
exports.Havings = havings






