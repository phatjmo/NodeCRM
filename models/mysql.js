
exports.connectDB = function connectDB (host, user, password, schema){

var mysqlModel = require('mysql-model')
  ,	db = mysqlModel.createConnection({
  		host    : host,
  		user    : user,
  		password: password,
  		database: schema,
  });
  //, db = mysql.createConnection('mysql://root@localhost/AREVonline')

  return db;

};