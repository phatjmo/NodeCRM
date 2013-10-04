/*
 * POST Data.
 */
var models = require('../models');
var users = models.users;
var customer = models.customer;
var employee = models.employee;
var orders = models.orders;
var poducts = models.products;
var accessList = models.accessList;

exports.dupe = function(req, res){
 
  switch(req.body.formName)
  	{
  	case 'frmCust':
  		console.log("Checking for Customer Dupe");
  		var txtCust = '{';
  		var dupeCust = new customer();
  		//console.log(req.body);
  		dupeCust.find('first', {fields: ['id'], where: "phone = '" + req.body.phone + "' or company = '" + req.body.company +"'"}, function(err, row){
  			console.log("Searching Table For Dupe!");
  			if (err) {
				console.log(err);
				res.send(500, err);
			} else if (row) {
  				console.log("Dupe Found: " + row.id);
  				res.json(row.id);
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
 
  
  console.log("Save request submitted: \n");
  
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
  		var newCust = new customer(jsonCust);
  		console.log(jsonCust);
  		if (req.body.id) {
  			newCust.set('id', req.body.id);
  			console.log("Dupe Overwrite");
  		}
  		console.log
  		newCust.save(function(err){
  			if (err) console.log(err);
  		});
  		res.send(200,'Customer Data Saved');
  		break;
  	case 'frmOrders':
  		console.log("Saving Order Data");
  		var txtOrder = '{';
   		for (field in req.body) {
  			if (field != "formName") {
  				var value = eval("req.body." + field);
  				txtOrder += '"'+field+'" : "'+value+'",\n';
  				//console.log(field + ' = ' + value);
  			};
  		}
  		txtOrder += '}';
  		var jsonOrder = eval ("(" + txtOrder + ")");
  		var newOrder = new orders(jsonOrder);
  		console.log(jsonOrder);
  		newOrder.save(function(err){
  			if (err) console.log(err);
  		});
  		res.send(200,'Order Data Saved');
  		break;
  	case 'frmEmp':
  		console.log("Saving Employee Data");
  		var txtEmp = '{';
   		for (field in req.body) {
  			if (field != "formName") {
  				var value = eval("req.body." + field);
  				txtEmp += '"'+field+'" : "'+value+'",\n';
  				//console.log(field + ' = ' + value);
  			};
  		}
  		txtEmp += '}';
  		var jsonEmp = eval ("(" + txtEmp + ")");
  		var newEmp = new employee(jsonEmp);
  		console.log(jsonEmp);
  		newEmp.save(function(err){
  			if (err) console.log(err);
  		});
  		res.send(200,'Employee Data Saved');
  		break;
  	case 'frmProd':
  		console.log("Saving Product Data");
  		var txtProd = '{';
   		for (field in req.body) {
  			if (field != "formName") {
  				var value = eval("req.body." + field);
  				txtProd += '"'+field+'" : "'+value+'",\n';
  				//console.log(field + ' = ' + value);
  			};
  		}
  		txtProd += '}';
  		var jsonProd = eval ("(" + txtProd + ")");
  		var newProd = new products(jsonProd);
  		console.log(jsonProd);
  		newProd.save(function(err){
  			if (err) console.log(err);
  		});
  		res.send(200,'Product Data Saved');
  		break;
  	case 'frmUser':
  		console.log("Saving Product Data");
  		var txtUser = '{';
   		for (field in req.body) {
  			if (field != "formName") {
  				var value = eval("req.body." + field);
  				txtUser += '"'+field+'" : "'+value+'",\n';
  				//console.log(field + ' = ' + value);
  			};
  		}
  		txtUser += '}';
  		var jsonUser = eval ("(" + txtUser + ")");
  		var newUser = new users(jsonUser);
  		console.log(jsonUser);
  		newUser.save(function(err){
  			if (err) console.log(err);
  		});
  		res.send(200,'User Data Saved');
  		break;		
  	default:
  		res.send(500, 'Invalid Form Post');
  		
  	}

  
};

exports.menus = function(req, res){

console.log("Menus Requested: \n");
 
  var userid = req.session.user.userid;
  var menu = req.body.menu;
  

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

 