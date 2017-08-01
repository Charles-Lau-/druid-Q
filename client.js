/**
 * Created by pengkun on 17/07/2017.
 */
"use strict";

var debug = require('debug')('druid-query:client'),
    Sender = require('./lib/sender')


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
     let res = {}
     let self = this
     intervals.forEach(function (interval, index){
         self.exec(query.clone().intervals(interval), function (err , data){
             counter ++
             if(err){
                 callback(err)
             }
             else {
                 res[index] = data
             }
             if(intervals.length === counter)
                 callback(null, res)
         })
     })
}

Client.prototype.execBatchQueries = function (queries, callback){
    let counter = 0
    let res = {}
    let self = this
    queries.forEach(function (query, index){
        self.exec(query, function (err , data){
            counter++
            if(err){
                callback(err)
            }
            else {
                res[index] = data
            }
            if(queries.length === counter)
                callback(null, res)
        })
    })
}







