/**
 * Created by pengkun on 18/07/2017.
 */

class Not{
    constructor(filter){
        this.type = 'not'
        this.field = filter
    }
    push(filter){
        var createFilter = require('./filter')
        if(arguments.length == 1 && typeof arguments[0] == 'object')
            this.field = filter
        else
            this.field = createFilter(...arguments)
    }
}

module.exports = Not

