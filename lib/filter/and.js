/**
 * Created by pengkun on 18/07/2017.
 */


class And{
    constructor(fields = []){
        this.type = 'and'
        this.fields = fields
    }
    push(filter) {
        var createFilter = require('./filter')
        if(arguments.length == 1 && typeof arguments[0] == 'object')
            this.fields.push(filter)
        else
            this.fields.push(createFilter(...arguments))
        return this
    }


}

module.exports = And
