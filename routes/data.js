/*
 * POST Data.
 */

exports.dupe = function(req, res){
  var mysqlModel = require('mysql-model');
  var sgiModels = mysqlModel.createConnection({
	host	: 'localhost',
	user	: 'root',
	password: '',
	database: 'sgicore',
	});	
  var Customer = sgiModels.extend({ tableName: "customer", });

  switch(req.body.formName)
  	{
  	case 'frmCust':
  		console.log("Checking for Customer Dupe");
  		var txtCust = '{';
  		var dupeCust = new Customer();
  		//console.log(req.body);
  		dupeCust.find('first', {fields: ['custid'], where: "phone = '" + req.body.phone + "' or company = '" + req.body.company +"'"}, function(err, row){
  			console.log("Searching Table For Dupe!");
  			if (err) {
				console.log(err);
				res.send(500, err);
			} else if (row) {
  				console.log("Dupe Found: " + row.custid);
  				res.json(row.custid);
  			} else {
  				console.log("No Dupe Found!");
  				res.send("nodupe");
  			}

  		});
  		 		
  		break;
  	case 'frmOrders':
  		console.log("Saving Order Data");
  		res.send(200,'Order Data Saved');
  		break;
  	case 'frmEmp':
  		console.log("Saving Employee Data");
  		res.send(200,'Employee Data Saved');
  		break;
  	case 'frmProd':
  		console.log("Saving Product Data");
  		res.send(200,'Product Data Saved');
  		break;	
  	default:
  		res.send(500, 'Invalid Form Post');
  		
  	}	

}

exports.save = function(req, res){
  var mysqlModel = require('mysql-model');
  var sgiModels = mysqlModel.createConnection({
	host	: 'localhost',
	user	: 'root',
	password: '',
	database: 'sgicore',
	});	
  var Customer = sgiModels.extend({ tableName: "customer", });	
  
  console.log("Save request submitted: \n");
  //console.log(req.body);
  //if (req.is('json')) {
  //	console.log("Request is JSON!")
  //}
  for (field in req.body) {
  	var value = eval("req.body." + field);
  	console.log(field + ' = ' + value);
  }
  switch(req.body.formName)
  	{
  	case 'frmCust':
  		console.log("Saving Customer Data");
  		var txtCust = '{';
   		for (field in req.body) {
  			if (field != "formName") {
  				var value = eval("req.body." + field);
  				txtCust += '"'+field+'" : "'+value+'",\n';
  				//console.log(field + ' = ' + value);
  			};
  		}
  		txtCust += '}';
  		var jsonCust = eval ("(" + txtCust + ")");
  		var newCust = new Customer(jsonCust);
  		console.log(jsonCust);
  		newCust.save(function(err){
  			if (err) console.log(err);
  		});
  		res.send(200,'Customer Data Saved');
  		break;
  	case 'frmOrders':
  		console.log("Saving Order Data");
  		res.send(200,'Order Data Saved');
  		break;
  	case 'frmEmp':
  		console.log("Saving Employee Data");
  		res.send(200,'Employee Data Saved');
  		break;
  	case 'frmProd':
  		console.log("Saving Product Data");
  		res.send(200,'Product Data Saved');
  		break;	
  	default:
  		res.send(500, 'Invalid Form Post');
  		
  	}

  
};

exports.menus = function(req, res){

console.log("Menus Requested: \n");
  //console.log(req.body);
  //if (req.is('json')) {
  //	console.log("Request is JSON!")
  //}
  var userid = req.session.user.userid;
  var menu = req.body.menu;
  var mysqlModel = require('mysql-model');
  var sgiModels = mysqlModel.createConnection({
	host	: 'localhost',
	user	: 'root',
	password: '',
	database: 'sgicore',
});
  var accessList = sgiModels.extend({ tableName: "accessList", });


  /*var jsonMenus = {
  	"menus": [
  	{"name" : "mainMenu", "command" : "mainCust", "label" : "Main Cust"},
  	{"name" : "mainMenu", "command" : "mainOrder", "label" : "Main Orders"},
  	{"name" : "mainMenu", "command" : "products", "label" : "Products"},
  	{"name" : "mainMenu", "command" : "employee", "label" : "Employees"},
  	{"name" : "mainMenu", "command" : "admin", "label" : "Administration"},
  	{"name" : "mainMenu", "command" : "utils", "label" : "Utilities"},
  	{"name" : "mainMenu", "command" : "logoff", "label" : "LogOff"}
  	]
};*/
	var sqlMenus = new accessList();
	sqlMenus.find("all", {where : "userid = " + userid + " AND menu = " + menu}, function(err, rows){
		if (err) console.log(err);
		console.log("Inside the model!");
		var txtMenus = '{ "menus": [\n ';
		for (m in rows) {
			console.log("1: " + rows[m]);
			if (m > 0) txtMenus += ',\n';
			txtMenus += '{"name" : "' + rows[m].menu + '", "command" : "' + rows[m].command + '", "label" : "' + rows[m].label + '"}';

		};
		txtMenus += ']}';
		//console.log(txtMenus);
		var jsonMenus = eval ("(" + txtMenus + ")");
		console.log(jsonMenus);
		res.json(jsonMenus);

	});

	//res.json(jsonMenus);
  
};

/*<ul id="mainMenu">
    	<li><a onclick="hitMenu('mainCust');">Main Cust</a></li>
    		<li><a onclick="hitMenu('mainOrder');">Main Orders</a></li>
    		<li><a onclick="hitMenu('products');">Products</a></li>
    		<li><a onclick="hitMenu('employee');">Employees</a></li>
    		<li><a onclick="hitMenu('admin');">Administration</a></li>
    		<li><a onclick="hitMenu('utils');">Utilities</a></li>
    		<li><a onclick="hitMenu('logoff');">LogOff</a></li>
    	</ul>
 */