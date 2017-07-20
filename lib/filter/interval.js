/**
 * Created by pengkun on 18/07/2017.
 */


class Interval{
    constructor(intervals = []){
        this.type = 'interval'
        this.dimension = '__time'
        this.intervals = intervals
    }
}

module.exports = Interval
