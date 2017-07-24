/**
 * Created by pengkun on 18/07/2017.
 */


/**
 * Generate intervals part, the form of this.intervals should be ['2012-01-01T00:00:00.000/2012-01-03T00:00:00.000']
 * parameter could be in three form, {start:xx, end:xx}, (start, end), and (['xxxx/xxxx'])
 */
module.exports  =  function (start, end) {
    if (Array.isArray(start))
        return start
    else if (typeof start == 'object' && start.hasOwnProperty('start') && start.hasOwnProperty('end'))
        return [start.start.toString() + '/' + start.end.toString()]
    else
        return [start.toString() + '/' + end.toString()]
}

