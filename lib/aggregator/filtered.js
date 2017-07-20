/**
 * Created by pengkun on 18/07/2017.
 */
var FieldMissingError = require('../error').FieldMissingError,
    FieldEmptyError =  require('../error').FieldEmptyError,
    isEmptyObject = require('../utils').isEmptyObject


class Filtered{
    constructor(filter, aggregator){
        this.type = 'filtered'
        this.filter = filter
        this.aggregator =aggregator
    }
    validate(){
        if(this.filter == undefined) throw new FieldMissingError('filter', 'filtered aggregator')
        if(isEmptyObject(this.filter)) throw new FieldEmptyError('filter', 'filtered aggregator')
        this.filter.validate()
        if(this.aggregator == undefined) throw new FieldMissingError('aggregator', 'filtered aggregator')
        if(isEmptyObject(this.aggregator)) throw new FieldEmptyError('aggregator', 'filtered aggregator')
        this.aggregator.validate()
    }
}
module.exports =  Filtered
