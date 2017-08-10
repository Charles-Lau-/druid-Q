/**
 * Created by pengkun on 19/07/2017.
 */
var util = require('util'),
    Query = require('./query'),
    map = require('lodash/map'),
    each = require('lodash/each'),
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

    dimensions(dimensions){
         if(Array.isArray(dimensions))
             each(dimensions, (dimension) =>{
                 _addDimension(dimension)
             })
         else
             _addDimension(dimensions)

        return this
    }


    _addDimension(dimension) {
        if(typeof dimension === 'string')
            this.addBasicValue('dimension', {type: 'default', dimension: dimension, outputName: dimension})
        else
            this.addBasicValue('dimension', {type:'default', dimension: dimension.dimension, outputName: dimension.outputName})
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
