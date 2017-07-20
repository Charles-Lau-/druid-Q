/**
 * Created by pengkun on 17/07/2017.
 */
"use strict";

var debug = require('debug')('druid-query:client'),
    Sender = require('./lib/sender')


module.exports = Client;


function Client(url){
     this.url = url;
     this.request = new Sender(url+"/druid/v2/?pretty")
     this.response = {};
     this.queryLoop = {};
}

Client.prototype.exec =  function (query, callback) {
    var realQuery = query.toJSON()
    if(debug.enabled) {
        debug('before validation of query')
        query.validate()
        debug('after validation of query')
    }
    debug('query %s is sent', JSON.stringify(realQuery))
    this.request.post(realQuery, (err, data, body) => {
            if(err) {
                    callback(err)
                    debug('error %s happens when send Query %s', err, JSON.stringify(realQuery))
            }
            else{
                    callback(null, query.parseRes(body))
                    debug('query %s has been completed', JSON.stringify(realQuery))
            }
      })
}





