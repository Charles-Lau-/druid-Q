/**
 * Created by pengkun on 17/07/2017.
 */
"use strict";

var debug = require('debug')('druid-query:client'),
    Sender = require('./lib/sender'),
    each = require('lodash/each')


module.exports = Client;


function Client(url, druid){
     this.url = url;
     this.request = new Sender(url+"/druid/v2/?pretty")
     this.druid = druid
}


Client.prototype.setCacheService =  function (cache){
    this.cs = cache
}

Client.prototype.exec =  function (query, callback, cache=false) {
    if(this.druid.ready == true) {
        var realQuery = query.toJSON()
        if (debug.enabled) {
            debug('before validation of query')
            query.validate()
            debug('after validation of query')
        }
        debug('query %s is sent', JSON.stringify(realQuery))
        if(cache) {
            let queries = query.split()
            let histor = queries[0]
            let realtime = queries[1]
            let realRes
            let hisRes
            let counter = 0
            let self = this
            if (histor) {
                if(realtime){
                    self.exec(realtime, function (err, data) {
                            counter += 1
                            if (data) {
                                if(counter == 2)
                                    callback(null, query.merge(hisRes, data))
                                else
                                    realRes = data
                            }
                            else {
                                callback(err)
                            }
                        })
                    this.cs.get(JSON.stringify(histor.toJSON), function (err, ca){
                            if (ca) {
                                debug('get result ' + ca + ' from cache for query ' + JSON.stringify(histor.toJSON()))
                                counter += 1
                                if(counter == 2)
                                    callback(null, query.merge(JSON.parse(ca), realRes))
                                else
                                    hisRes = JSON.parse(ca)
                            }
                            else {
                                self.exec(histor, function (err, data){
                                    counter += 1
                                    if (data) {
                                        if(counter == 2)
                                            callback(null, query.merge(data, realRes))
                                        else
                                            hisRes = data
                                        self.cs.set(JSON.stringify(histor.toJSON()), JSON.stringify(data))
                                        debug('set cache for query '+ JSON.stringify(histor.toJSON()))
                                    }
                                    else {
                                        callback(err)
                                    }
                                })
                            }
                    })
                }
                else{
                    this.cs.get(JSON.stringify(histor.toJSON), function (err, ca){
                        if (ca) {
                            debug('get result ' + ca + ' from cache for query ' + JSON.stringify(histor.toJSON()))
                            callback(null, JSON.parse(ca))
                        }
                        else {
                            self.exec(histor, function (err, data){
                                if (data) {
                                    callback(null, data)
                                    self.cs.set(JSON.stringify(histor.toJSON()), JSON.stringify(data))
                                    debug('set cache for query '+ JSON.stringify(histor.toJSON()))
                                }
                                else {
                                    callback(err)
                                }
                            })
                        }
                    })
                }
            }
            else{
                this.request.post(realQuery, (err, data, body) => {
                    if (err) {
                        callback(err)
                        debug('error %s happens when send Query %s', err, JSON.stringify(realQuery))
                    }
                    else {
                        callback(null, query.parseRes(body))
                        debug('query %s has been completed', JSON.stringify(realQuery))
                    }
                })
            }
        }
        else{
                this.request.post(realQuery, (err, data, body) => {
                    if (err) {
                        callback(err)
                        debug('error %s happens when send Query %s', err, JSON.stringify(realQuery))
                    }
                    else {
                        callback(null, query.parseRes(body))
                        debug('query %s has been completed', JSON.stringify(realQuery))
                    }
                })
            }

    }

    else{
        var self = this
        this.druid.reload(function (){self.exec(query, callback)})
    }
}

Client.prototype.execBatchInterval = function (query, intervals , callback, cache=false){
     let counter = 0
     let res
     let length
     if(Array.isArray(intervals)){
         res = new Array(intervals.length)
         length =  res.length
     }
     else{
         res = {}
         length = Object.keys(intervals).length
     }
     let self = this
     each(intervals, function (interval, index){
         self.exec(query.clone().intervals(interval), function (err , data){
             counter ++
             if(err){
                 callback(err)
             }
             else {
                 res[index] = data
             }
             if(length === counter)
                 callback(null, res)
         }, cache)
     })
}

Client.prototype.execBatchQueries = function (queries, callback, cache=false){
    let counter = 0
    let res
    let length
    if(Array.isArray(queries)){
        res = new Array(queries.length)
        length = res.length
    }
    else{
        res = {}
        length = Object.keys(queries).length
    }
    let self = this
    each(queries, function (query, index){
        self.exec(query, function (err , data){
            counter++
            if(err){
                callback(err)
            }
            else {
                res[index] = data
            }
            if(length === counter)
                callback(null, res)
        }, cache)
    })
}







