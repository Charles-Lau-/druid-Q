/**
 * Created by pengkun on 19/07/2017.
 */
var ExpectStrFieldNotEmpty = require('../error').ExpectStrFieldNotEmpty

class Constant{
    constructor(name, val){
        this.type = 'constant'
        this.name = name
        this.value=val
    }

    validate(){
        ExpectStrFieldNotEmpty('constant postAggregator', this, ...['name', 'value'])
    }
}
module.exports  = Constant
