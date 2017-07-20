/**
 * Created by pengkun on 18/07/2017.
 */


class And{
    constructor(fields = []){
        this.type = 'and'
        this.fields = fields
    }
    push(filter) {this.fields.push(filter); return this;}
}

module.exports = And
