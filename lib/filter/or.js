/**
 * Created by pengkun on 18/07/2017.
 */
class Or{
    constructor(fields){
        this.fields = fields
        this.type = 'or'
    }
    push(filter){
        this.fields.push(filter)
        return this
    }
}

module.exports = Or
