/**
 * Created by pengkun on 18/07/2017.
 */


module.exports = function (dimension,fields = []){
    return {
        type: 'and',
        fields: fields,
        dimension: dimension,
        push:  function (filter) {this.fields.push(fields); return this;},
    }
}
