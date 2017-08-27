/**
 * Created by pengkun on 18/07/2017.
 */


var util = require('util'),
    m = require('moment-timezone'),
    Query = require('./query');
    map = require('lodash/map')


class TimeSeriesQuery extends Query{

    constructor(ds){
        super(
         (x) => x,
         {
             dataSource: ds,
             queryType: 'timeseries',
             granularity: 'day'
         }
      )
      this.addBasicValue("aggregations", this.aggregations)
      this.addBasicValue("filter", this._filter)
      this.addBasicValue("postAggregations", this.postAggregations)

      this.requiredField = this.requiredField.concat(['granularity','aggregations','intervals'])
   }

    split() {
        let inter = this._query.intervals[0].split('/')
        let gra = this._query.granularity
        if (m().tz('Europe/Berlin').toISOString() < inter[1]) {
          if(typeof gra == 'string' && gra != 'all'){
                  let splitter =  m().tz('Europe/Berlin').startOf(gra.toLowerCase() === 'week' ? 'isoWeek': gra).toISOString()
                  return [this.clone()
                              .intervals(inter[0], m().tz('Europe/Berlin').endOf(gra.toLowerCase() === 'week' ? 'isoWeek': gra)
                              .add(-1, gra).toISOString()),
                          this.clone().intervals(splitter, inter[1])]
          }
          else if(typeof gra == 'object'){
              let res
              switch ( gra.period) {
                  case 'P1D':
                      this.granularity('day')
                      res = this.split()
                      break
                  case 'P1W':
                      this.granularity('week')
                      res = this.split()
                      break
                  case 'P1M':
                      this.granularity('month')
                      res = this.split()
                      break
                  default:
                      res =  [null, this]

              }
              res.map((q) =>{
                  if(q != null)
                      q.granularity(gra)
              })
              return res
          }
          return [null, this]
        }
        else {
            return [this, null]
        }

    }
}

module.exports = TimeSeriesQuery
