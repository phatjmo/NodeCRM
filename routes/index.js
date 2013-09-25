
/*
 * GET home page.
 */

exports.index = function(req, res){
  res.render('workspace', 
  	{ 
  		title: 'SGI Core',
  		partials:
  		{
  			background : 'background',
  			body : "body",
  		}
  	});
};

exports.login = function(req, res){
  res.render('login', 
  	{ 
  		title: 'SGI Core',
  		partials:
  		{
  			background : 'background',
  			body : "body",
  		}
  	});
};