
/**
 * Module dependencies.
 */

var express = require('express');
var routes = require('./routes');
var models = require('./models');
var user = require('./routes/user');
var data = require('./routes/data');
var http = require('http');
var path = require('path');
var hash = require('./pass').hash;


//Model declarations
var users = models.users;
var customer = models.customer;
var employee = models.employee;
var orders = models.orders;
var poducts = models.products;
var accessList = models.accessList;



var app = express();

// all environments
app.set('port', process.env.PORT || 3000);
app.set('views', __dirname + '/views');
app.set('view engine', 'hjs');
app.set('layout', 'layout');
/* app.set('partials', {
  head: "head",
  header: "header",
  body: "body",
  menu: "menu", 
  footer: "footer"
}); */
app.enable('view cache');
app.engine('hjs', require('hogan-express'));
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.bodyParser());
app.use(express.methodOverride());
app.use(express.cookieParser('The Answer is 42'));
app.use(express.session());
app.use(express.errorHandler({ dumpExceptions: true, showStack: true }));
app.use(app.router);
app.use(require('less-middleware')({ src: __dirname + '/public' }));
app.use(express.static(path.join(__dirname, 'public')));

// Session-persisted message middleware

app.use(function(req, res, next){
  var err = req.session.error
    , msg = req.session.success;
  delete req.session.error;
  delete req.session.success;
  res.locals.message = '';
  if (err) res.locals.message = '<p class="msg error">' + err + '</p>';
  if (msg) res.locals.message = '<p class="msg success">' + msg + '</p>';
  next();
});



// development only
if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}


function authenticate(name, pass, fn) {
  if (!module.parent) console.log('authenticating %s:%s', name, pass);
  
  //console.log("user = " + user.name);
  	// query the db for the given username
  	if (!theUser) {
  		console.log("theUser invalid");
  		return fn(new Error('cannot find user'));
  	}
  	// apply the same algorithm to the POSTed password, applying
  	// the hash against the pass / salt, if there is a match we
  	// found the user
  	console.log("The User Salt: " + theUser.salt);
  	hash(pass, theUser.salt, function(err, hash){
    	if (err) return fn(err);
    	if (hash == theUser.hash) return fn(null, theUser);
    	fn(new Error('invalid password'));
  	});
  
}

function restrict(req, res, next) {
  if (req.session.user) {
    next();
  } else {
    req.session.error = 'Access denied!';
    res.redirect('/login');
  }
}

app.get('/', function(req, res){
  res.redirect('login');
});

app.get('/restricted', restrict, function(req, res){
  res.send('Wahoo! restricted area, click to <a href="/logout">logout</a>');
});

app.get('/logout', function(req, res){
  // destroy the user's session to log them out
  // will be re-created next request
  req.session.destroy(function(){
    res.redirect('/');
  });
});

//app.get('/login', function(req, res){
//  res.render('login');
//});

app.post('/login', function(req, res){
  var authUser = new users();
  if (!req.body.username && !req.body.password) {
  	console.log('Nothing Sent!');
  	req.session.message = "Come on now, ya gotta enter SOMETHIN'!";
  	res.redirect('login');
  } else {
  	authUser.find('first', {where: "login = '"+req.body.username+"'"}, function(err, user){
	if (err) {
		console.log(err);
		res.send(err);
	}
	//if (user) console.log("Object Returned: " + user);
	if (user && user.salt && user.encryptedPass) {
		if (!module.parent) console.log('authenticating %s:%s', req.body.username, req.body.password);
  
    	console.log("The User Salt: " + user.salt);
  		
  		hash(req.body.password, user.salt, function(err, hash){
    		if (err) return err;
    		console.log("hash = " + hash);
    		console.log("user.hash = " + user.encryptedPass);
    		if (hash == user.encryptedPass) {
    			//return user;
    			req.session.regenerate(function(){
        			// Regenerate session when signing in
      				// to prevent fixation
        			// Store the user's primary key 
        			// in the session store to be retrieved,
        			// or in this case the entire user object
        			req.session.user = user;
        			req.session.success = 'Authenticated as ' + user.login
        			+ ' click to <a href="/logout">logout</a>. '
        			+ ' You may now access <a href="/restricted">/restricted</a>.';
        			console.log("Session Saved: " + req.session.user.id + ":" + req.session.user.login + ":" + req.session.user.firstName + ":" + req.session.user.lastName);
        			res.redirect('sgicore');
      			});
    		} else {
    		console.log('invalid password');
    		req.session.message = 'Please check your password.';
    			res.redirect('login');
    		}
  		});
  		
    } else {
      		//req.session.error = 'Authentication failed, please check your '
      		req.session.message = 'Please check your username.';
        	console.log('Username not found!');
        	res.redirect('login');
    }
  });
 }

		//console.log("Returning rowset: " + user.login);
		//return user;
	
  });




app.get('/sgicore', restrict, routes.index);
//app.post('/', routes.index);
//app.post('/saveData', routes.index);
app.post('/save', data.save);
app.post('/dupe', data.dupe);
app.post('/menus', data.menus);
app.get('/login', routes.login);

app.get("/hashthis", function(req, res){
	if (req.query.password) {
	var pass = req.query.password;
	hash(pass, function(err, salt, hash){
  		if (err) throw err;
  		// store the salt & hash in the "db"
  			res.send("Your salt is: " + salt + "<BR>" + "Your hash is: " + hash);
 			console.log("Your salt is: " + salt);
  			console.log("Your hash is: " + hash);
		});
	} else {
		res.send("<strong>Hey bub, what's the deal? You need to send a password with that request!<strong>");

	}
  });
app.post("/hashthis", function(req, res){
  if (req.body.password) {
  var pass = req.body.password;
  var response = {
      hash: "",
      salt: ""
    };
  console.log("Hashing Password: " + pass);
  hash(pass, function(err, salt, hash){
      if (err) throw err;
      // store the salt & hash in the "db"
      console.log("The hash is: " + hash);
      console.log("The salt is: " + salt);
      response.hash = hash;
      response.salt = salt;
      response.message = "SUCCESS";
      
      res.json(response);
    });
  } else {
    response.message = "FAILED";
    res.json(response);
  }

  });




http.createServer(app).listen(app.get('port'), function(){
  console.log('SGI Core server listening on port ' + app.get('port'));
});
