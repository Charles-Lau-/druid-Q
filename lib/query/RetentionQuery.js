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
}
