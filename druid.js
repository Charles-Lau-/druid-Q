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
     this.requestStack = []
     var self = this
     this.on('ready', function (){
           self.ready = true
           debug('client has successfully connected to druid cluster');
           if(this.requestStack.length > 0){
               for(let request of this.requestStack)
                   request()
           }
     });
     this.on('error', function (){
           debug('the broker address maybe incorrect, client can not connect to the druid cluster');
           throw new DruidError('can not connect to druid cluster');
     });
     debug('send request to druid cluster to test whether it is connectable')
     request.get(this.brokerAddr+'/status', function (err){
           if(!err)
               self.emit('ready')
           else
               self.emit('error')
     })


}
util.inherits(Druid, EventEmitter)

Druid.prototype.client = function (){
    debug('new a client instance')
    return new Client(this.brokerAddr, this)
}

Druid.prototype.reload = function (cb){
    this.requestStack.push(cb)
}












