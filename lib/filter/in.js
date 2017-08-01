/**
 * Created by pengkun on 18/07/2017.
 */

class In{
    constructor(dimension, vals = []){
        this.type = 'in'
        this.dimension = dimension
        this.values = vals
    }
    push(val) {
        this.values.push(val)
        return this
    }
}

module.exports  = In
