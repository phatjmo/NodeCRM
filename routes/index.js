
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
  			background : 'background'
  		}
  	});
};

exports.login = function(req, res){
  res.render('login', 
  	{ 
  		title: 'SGI Core',
  		message : req.session.message,
  		partials:
  		{
  			head: 'head',
  			background : 'background',
  			logo: 'logo',
  		}
  	});
};