
/*
 * GET home page.
 */

exports.index = function(req, res){
  res.render('index', 
  	{ 
  		title: 'SGI Core',
  		partials:
  		{
  			head : 'head',
  			body : "body",
  		}
  	});
};