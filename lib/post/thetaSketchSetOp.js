/**
 * Created by pengkun on 19/07/2017.
 */
module.exports = function (outputName, op, fields=[]){
    return {
        type:'thetaSketchSetOp',
        name: outputName,
        func: op,
        fields:fields,

    }

}
