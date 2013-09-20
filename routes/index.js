
/*
 * GET home page.
 */

exports.index = function(req, res){
  res.render('workspace', 
  	{ 
  		title: 'SGI Core',
  		partials:
  		{
  			head : 'head',
  			body : "body",
  		}
  	});
};