exports.parseModels = function parseModels (server) {
    
  var mysql = require('./mysql')
    , db = mysql.connectDB('localhost','root','','test')
    , user = require('./user');

    return server;


    
};