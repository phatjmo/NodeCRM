var mysqlModel = require('mysql-model');
var sgiModels = mysqlModel.createConnection({
  host  : 'localhost',
  user  : 'root',
  password: '',
  database: 'sgicore',
});
var users = sgiModels.extend({ tableName: "users", });
var customer = sgiModels.extend({ tableName: "customer", });
var employee = sgiModels.extend({ tableName: "employee", });
var orders = sgiModels.extend({ tableName: "orders", });
var poducts = sgiModels.extend({ tableName: "products", });
var accessList = sgiModels.extend({ tableName: "accessList", });

exports.users = users;
exports.customer = customer;
exports.employee = employee;
exports.orders = orders;
exports.accessList = accessList;