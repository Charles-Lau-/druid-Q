'use strict'

var Druid = require('./druid'),
    utils = require('./lib/utils'),
    queries = utils.moduleMap(__dirname + '/lib/query'),
    lodash = require('lodash')

module.exports = Druid

lodash.each(queries, (query) =>{
    Druid[query.name] =  query
})



