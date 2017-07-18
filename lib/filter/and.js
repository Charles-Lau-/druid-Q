/**
 * Created by pengkun on 18/07/2017.
 */


module.exports = function (fields = []){
    return {
        type: 'and',
        fields: fields,
        push:  function (filter) {this.fields.push(fields); return this;}
    }
}
