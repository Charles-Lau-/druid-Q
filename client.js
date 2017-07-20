/**
 * Created by pengkun on 17/07/2017.
 */
"use strict";


var EventEmitter = require('events').EventEmitter,
    debug = require('debug')('druid-query:druid'),
    DruidError = require('./lib/error'),
    Sender = require('./lib/sender'),
    util = require('util');


module.exports = Client;


function Client(url){
     this.url = url;
     this.request = new Sender(url+"/druid/v2/?pretty")
     this.response = {};
     this.queryLoop = {};
}

Client.prototype.exec =  function (query, callback) {
      query.validate()
      this.request.post(query.toJSON(), (err, data, body) => {
            if(err) {
                    callback(err)
            }
            else{
                    callback(null, query.parseRes(body))
            }
      })
}





