/**
 * Created by pengkun on 18/07/2017.
 */
module.exports = function (name, fields, byRow=false){
    return {
        type:cardinality,
        name:name,
        fields: fields,
        byRow: byRow
    }

}
