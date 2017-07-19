/**
 * Created by pengkun on 19/07/2017.
 */
module.exports =  function (having){
    return {
        type: 'not',
        havingSpec: having
    }

}
