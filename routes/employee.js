/*
 * POST Employee.
 */

exports.save = function(req, res){
  
  console.log("Save request submitted: \n");
  console.log(req.body);
  //if (req.is('json')) {
  //	console.log("Request is JSON!")
  //}
  for (field in req.body) {
  	var value = eval("req.body." + field);
  	console.log(field + ' = ' + value);
  }

  res.send(200);
  /*res.render('workspace', 
  	{ 
  		title: 'SGI Core',
  		partials:
  		{
  			background : 'background',
  			body : "body",
  		}
  	});*/
};