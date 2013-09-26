
/**
 * Module dependencies.
 */

var express = require('express');
var routes = require('./routes');
var models = require('./models');
var mysqlModel = require('mysql-model');
var user = require('./routes/user');
var data = require('./routes/data');
var http = require('http');
var path = require('path');
var sgiModels = mysqlModel.createConnection({
	host	: 'localhost',
	user	: 'root',
	password: '',
	database: 'sgicore',
});
var hash = require('./pass').hash;
//var passport = require('passport');
//var bcrypt = require('bcrypt');
//var LocalStrategy = require('passport-local').Strategy;
//var flash = require('connect-flash');

//Model declarations
var users = sgiModels.extend({ tableName: "users", });
var customer = sgiModels.extend({ tableName: "customer", });
var employee = sgiModels.extend({ tableName: "employee", });
var orders = sgiModels.extend({ tableName: "orders", });
var poducts = sgiModels.extend({ tableName: "products", });
var accessList = sgiModels.extend({ tableName: "accessList", });


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
//app.use(flash());
//app.use(passport.initialize());
//app.use(passport.session());
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

//Configuring Authentication
/*passport.serializeUser(function(user, done) {
  console.log("serializeUser: " + user.login);
  done(null, user.login);
});

passport.deserializeUser(function(id, done) {
  console.log("deserializeUser");
});*/

/*passport.use(new LocalStrategy(
  function(username, password, done) {
    console.log("LocalStrategy Function!!!");
    var authUser = new users();
    //console.log(authUser);
    //authUser.find('first',{function(err, result){
    //authUser.find('first', {where: "login = 'justin'"}, function(err, result){
    authUser.find('first', {where: "login ='"+username+"'"}, function(err, result){
    	if (!result) {
    		console.log("User Not Found!");
    	} else {
    		console.log("userid = " + result.userid);
    		console.log("login = " + result.login);
    		console.log("firstName = " + result.firstName);
    		console.log("lastName = " + result.lastName);
    		console.log("encryptedPass = " + result.encryptedPass);
    	}

    });
    console.log("User Name: " + username);
    console.log("Password: " + password);
    //User.findOne({ username: username }, function(err, user) {
    authUser.find('first', {where: "login ='"+username+"'"}, function(err, user){
      
      if (err) { 
      	console.log(err);
      	return done(err);
       }
      if (!user) {
      	console.log("Incorrect Username");
        return done(null, false, { message: 'Incorrect username.' });
      }
      if (!user.encryptedPass == password) {
        console.log("Incorrect Password");
        return done(null, false, { message: 'Incorrect password.' });
      }
      return done(null, user);
    })
  }
));*/

// development only
if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}

// dummy database

//var users = {
//  tj: { name: 'tj' }
//};

// when you create a user, generate a salt
// and hash the password ('foobar' is the pass here)

/*hash('foobar', function(err, salt, hash){
  if (err) throw err;
  // store the salt & hash in the "db"
  users.tj.salt = salt;
  users.tj.hash = hash;
  console.log("Salt: " + users.tj.salt);
  console.log("Hash: " + users.tj.hash);
});*/


// Authenticate using our plain-object database of doom!

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

app.get('/login', function(req, res){
  res.render('login');
});

app.post('/login', function(req, res){
  var authUser = new users();

  authUser.find('first', {where: "login = '"+req.body.username+"'"}, function(err, user){
	if (err) {
		console.log(err);
		res.send(err);
	}
	if (user.salt && user.encryptedPass) {
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
        			req.session.success = 'Authenticated as ' + user.name
        			+ ' click to <a href="/logout">logout</a>. '
        			+ ' You may now access <a href="/restricted">/restricted</a>.';
        			res.redirect('sgicore');
      			});
    		} else {
    		console.log('invalid password');
    			res.redirect('login');
    		}
  		});
  		
    } else {
      		//req.session.error = 'Authentication failed, please check your '
      		console.log('Authentication failed, please check your '
        	+ ' username and password.');
      		res.redirect('login');
    }
  });

		//console.log("Returning rowset: " + user.login);
		//return user;
	
  });




app.get('/sgicore', restrict, routes.index);
//app.post('/', routes.index);
//app.post('/saveData', routes.index);
app.post('/save', data.save);
app.post('/menus', data.menus);
//app.get('/login', routes.login);*/

//Use Below for Passport Local
/*app.post('/login',
  passport.authenticate('local', { successRedirect: '/',
                                   failureRedirect: '/login',
                                   failureFlash: false })
);*/
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




http.createServer(app).listen(app.get('port'), function(){
  console.log('SGI Core server listening on port ' + app.get('port'));
});
