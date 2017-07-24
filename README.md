druid-query
================

A querying library for Druid (http://druid.io) in Node.js. Inspired by [node-druid-query](https://github.com/7eggs/node-druid-query).
The purpose of this project is to provide update-to-date features of lastest version of druid, and also keep adding useful features based
on the practical requirement from my daily work, also it is very welcome to submit issues to enrich its funtionalities


Table of Contents:

- [Installation & Introductory Examples](#installation)
- [API](#api)
- [Queries](#queries)
- [TODO](#todo)
- [License](#license)


Installation
------------

    npm install druid-query --save

Example (simple)
----------------

```js
var Druid = require('./druid-query').Druid,
    Aggregators = require('./druid-query').aggregators,
    Filters = require('./druid-query').filters,
    posts = require('./druid-query').posts,
    Havings = require('/druid-query').havings,
  , client = Druid.client('url')

var query = Druid.TimeSeriesQuery('ds')
                .interval("2017-06-02T00:00:00.000","2017-06-03T00:00:00.000")
                .filter('selector', 'event', 'click')
                .aggregator('count')
client.exec(query, callback) 

var query2 = query.clone()
query2.filter(new filters.selector('event','browser'))
client.exec(query, callback)

var query3 = query.clone()
query3.addFilter('selector', 'time','today')
client.exec(query, callback)
```

API
------------------
Need to do

TODO
------------------
More tests and more features

License
------------------
MIT