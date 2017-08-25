/**
 * Created by pengkun on 18/07/2017.
 */

class Or{
    constructor(fields=[]){
        this.fields = fields
        this.type = 'or'
    }
    push(filter){
        var createFilter = require('./filter')
        if(arguments.length == 1 && typeof arguments[0] == 'object')
            this.fields.push(filter)
        else
            this.fields.push(createFilter(...arguments))
    }
}

module.exports = Or
