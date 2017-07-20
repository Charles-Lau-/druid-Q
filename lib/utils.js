/**
 * Created by pengkun on 17/07/2017.
 */

var fs = require('fs')
    , path = require('path')


/**
 * Load modules from folder and map them to object by filenames.
 *
 * @param {string} dir
 * @returns {Object}
 */
exports.moduleMap = function(dir, exclusion) {
    var map = {}
    fs.readdirSync(dir).forEach(mapFn)
    function mapFn(filename) {
        if (filename === 'index.js' || filename === 'query.js' || filename === exclusion) {
            return
        }

        var modulePath = path.basename(filename, '.js')
        map[modulePath] = require(path.join(dir, filename))
    }

    return map
}


exports.isEmptyStr = function (str){
    return str == undefined || str == ''
}

exports.isEmptyArray = function (arr){
    return  arr.length == 0
}

exports.isEmptyObject = function (obj){
    return Object.keys(obj).length == 0
}
