/**
 * Created by pengkun on 17/07/2017.
 */

module.exports = Query


function Query(){
    this._query = {queryType:"", dataSource:""}
    this.requiredField = ["queryType","dataSource"]
    if(arguments.length == 1){
        console.log(arguments)
        for(let key  of Object.keys(arguments[0])){
           this._query[key] = arguments[0][key]
        }
    }
}


Query.prototype.toJSON =  function (){
       return this._query
}

Query.prototype.validate = function (){
        var queryFields =  Object.keys(this._query)
        for(let field in this.requiredField){
            if(!(field in queryFields))
                return false
        }
        return true
}

Query.prototype.cancel = function (){

}

Query.prototype.exec = function (){

}

Query.prototype.addBasicValue = function (name, val){
    this._queryType.name = val
}



