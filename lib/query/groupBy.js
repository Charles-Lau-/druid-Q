/**
 * Created by pengkun on 19/07/2017.
 */
var util = require('util'),
    Query = require('./query'),
    map = require('lodash/map'),
    LimitSpec = require('../limitSpec').LimitSpec



class GroupByQuery extends Query{
    constructor(ds) {
        super(
            (x) => map(x, (ele) => ele.event),
            {
                dataSource: ds,
                queryType: 'groupBy',
                granularity: 'all',
                limitSpec: new LimitSpec()
            }
        )
        this.addBasicValue("aggregations", this.aggregations)
        this.addBasicValue("filter", this._filter)
        this.addBasicValue("postAggregations", this.postAggregations)

        this.dimensions = []
        this.addBasicValue("dimensions", this.dimensions)

        this.having = {}

        this.requiredField = this.requiredField.concat(['granularity','limitSpec','aggregations','intervals'])


    }

    dimensions(dimension) {
        this.dimensions.push(dimension)
        return this
    }

    setDimension(dimensions) {
        this.dimensions.length = 0
        Object.assign(this.dimensions, dimensions)
        return this
    }

    having(having) {
         this.having = having
    }

    toJSON() {
       if(Object.keys(this.having).length != 0)
           this.addBasicValue("having", this.having)
       return this._query
    }
}


module.exports = GroupByQuery
