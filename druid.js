'use strict'


var EventEmitter = require('events').EventEmitter,
           debug = require('debug')('druid-query:druid'),
           DruidError = require('./lib/error'),
           request = require('request'),
           util = require('util'),
           Client = require('./client.js');

module.exports = Druid;


/**
 * This is single broker version of query client for druid
 * @param brokerAddra   address for broker
 * @constructor
 */
function Druid(brokerAddr){
     EventEmitter.call(this);
     this.setMaxListeners(0);
     this.brokerAddr = brokerAddr;
     this.ready = false;
     var self = this
     this.on('ready', function (){
           self.ready = true
           debug("client has successfully connected to druid cluster");
     });
     this.on('error', function (){
           debug("the broker address maybe not correct, client can not connect to the druid cluster");
           throw new DruidError('can not connect to druid cluster');
     });
     request.get(this.brokerAddr+'/status', function (err){
           if(!err)
               self.emit('ready')
           else
               self.emit('error')
     })


}
util.inherits(Druid, EventEmitter)

Druid.prototype.client = function (){
    return new Client(this.brokerAddr)
}













