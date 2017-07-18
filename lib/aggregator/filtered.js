/**
 * Created by pengkun on 18/07/2017.
 */
module.exports = function (filter, aggregator){
    return {
          type:'filtered',
          filter: filter,
          aggregator: aggregator
    }

}
