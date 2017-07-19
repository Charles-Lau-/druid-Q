/**
 * Created by pengkun on 19/07/2017.
 */
module.exports =  function (outputName, op){
    return {
        type: "thetaSketchEstimate",
        name:  outputName,
        field: op
    }

}
