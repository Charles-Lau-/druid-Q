/**
 * Created by pengkun on 19/07/2017.
 */

var util = require('util'),
    Query = require('./query');


class TopNQuery extends Query{

    constructor(ds) {
        super(
            (x) => x[0].result,
            {
                dataSource: ds,
                queryType: 'topN',
                granularity: 'all',
                descending: true,
                threshold: 100000
            }
        )
        this.addBasicValue("aggregations", this.aggregations)
        this.addBasicValue("filter", this._filter)
        this.addBasicValue("postAggregations", this.postAggregations)

        this.requiredField = this.requiredField.concat(['granularity', 'threshold', 'descending',
            'aggregations', 'intervals', 'metric',
            'dimension'
        ])
    }

    dimension(dimension, outputName=dimension) {
        if(typeof dimension === 'string')
            this.addBasicValue('dimension', {type:'default',dimension:dimension,outputName:outputName})
        else
            this.addBasicValue('dimension', dimension)
        return this
    }

    metric(metric) {
        this.addBasicValue('metric', metric)
        return this
    }




    limit(limit) {
        this.addBasicValue("threshold", limit)
        return this
    }
}


module.exports = TopNQuery
