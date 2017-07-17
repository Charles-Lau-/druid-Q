/**
 * Created by pengkun on 17/07/2017.
 */
'use strict'
var request = require('request');


module.exports =  Sender


function Sender(url){
    this.url = url
}

Sender.prototype.post = function (query, fn){
            request.post(
                {
                    url: this.url,
                    method: "POST",
                    json: true,
                    headers: {
                        "content-type": "application/json",
                    },
                    body: query
                }
                ,fn)
        }

Sender.prototype.get = function (fn){
            request.get(this.url,{
                    headers: {
                        "Content-type": "application/json; charset=UTF-8",
                        "Accept": "application/json; charset=UTF-8"
                    }
                }
                ,fn)
        }
