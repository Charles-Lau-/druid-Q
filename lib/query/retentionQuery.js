/**
 * Created by pengkun on 18/08/2017.
 */
var  Query = require('./query'),
    map = require('lodash/map'),
    each = require('lodash/each')

class RetentionQuery extends Query{
    constructor(ds){
        super(
            (x) => map(x, (ele) => ele.event),
            {
                dataSource: ds,
                queryType: 'groupBy',
                granularity: 'all',
                dimensions:[]
            }
        )
        this.addBasicValue("aggregations", this.aggregations)
        this.addBasicValue("filter", this._filter)
        this.addBasicValue("postAggregations", this.postAggregations)

        this.requiredField = this.requiredField.concat(['granularity','aggregations','intervals'])

    }
    toJSON(){
        return this._query
    }

    intervalFiltered(interval, outputName, fieldName) {
        this.aggregator('filtered')
                .withF('interval', interval)
                .withG('thetaSketch', outputName, fieldName)
        return this
    }

    intersect(outputName, aggName1, aggName2){
        return this._postAgg(outputName, aggName1, aggName2, 'INTERSECT')
    }
    union(outputName, aggName1, aggName2){
        return this._postAgg(outputName, aggName1, aggName2, 'UNION')
    }
    not(outputName, aggName1, aggName2){
        return this._postAgg(outputName, aggName2, aggName2, 'NOT')
    }

    _postAgg(outputName, aggName1, aggName2, op){
        this.postAggregator('thetaSketchEstimate', 'outputName')
            .with('thetaSketchSetOp', 'not_matter', op)
            .with('fieldAccess', aggName1)
            .with('fieldAccess', aggName2)
        return this
    }
}

module.exports = RetentionQuery
