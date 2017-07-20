/**
 * Created by pengkun on 18/07/2017.
 */

class Search{
    constructor(dimension, type, val){
        this.type = 'search'
        this.dimension = dimension
        this.query = {
            type: type,
            value: val
        }
    }

}
module.exports =  Search

