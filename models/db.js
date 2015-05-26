/**
 * Created by jade on 2015/5/25.
 */

/*var settings=require("../setting.js");
    Db=require("mongodb").Db,
    Connection=require("mongodb").Connection,
    Server=require("mongodb").Server;

module.exports=new Db(settings.db,new Server(settings.host,Connection.DEFAULT_PORT),{safe:true});*/

//创建数据库链接
var mongooose=require("mongoose");
mongooose.connect("mongodb://localhost/nodejs");
exports.mongoose=mongooose;