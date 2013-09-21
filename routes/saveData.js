/*
 * POST Save Data.
 */

exports.saveData = function(req, res){
  
  console.log("Save request submitted: \n" + req.query);
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