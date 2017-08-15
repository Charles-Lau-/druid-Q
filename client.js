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
     this.response = {};
     this.queryLoop = {};
}


Client.prototype.exec =  function (query, callback) {
    if(this.druid.ready == true) {
        var realQuery = query.toJSON()
        if (debug.enabled) {
            debug('before validation of query')
            query.validate()
            debug('after validation of query')
        }
        debug('query %s is sent', JSON.stringify(realQuery))
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
    else{
        var self = this
        this.druid.reload(function (){self.exec(query, callback)})
    }
}

Client.prototype.execBatchInterval = function (query, intervals , callback){
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
         })
     })
}

Client.prototype.execBatchQueries = function (queries, callback){
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
        })
    })
}







