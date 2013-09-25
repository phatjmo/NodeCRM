
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
var passport = require('passport');
var bcrypt = require('bcrypt');
var LocalStrategy = require('passport-local').Strategy;
var flash = require('connect-flash');

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
app.use(express.cookieParser('your secret here'));
app.use(express.session());
app.use(express.errorHandler({ dumpExceptions: true, showStack: true }));
app.use(flash());
app.use(passport.initialize());
app.use(passport.session());
app.use(app.router);
app.use(require('less-middleware')({ src: __dirname + '/public' }));
app.use(express.static(path.join(__dirname, 'public')));

//Configuring Authentication
passport.serializeUser(function(user, done) {
  console.log("serializeUser: " + user.login);
  done(null, user.login);
});

passport.deserializeUser(function(id, done) {
  console.log("deserializeUser");
});

passport.use(new LocalStrategy(
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
));

// development only
if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}

app.get('/', routes.index);
//app.post('/saveData', routes.index);
app.post('/save', data.save);
app.post('/menus', data.menus);
app.get('/login', routes.login);
app.post('/login',
  passport.authenticate('local', { successRedirect: '/',
                                   failureRedirect: '/login',
                                   failureFlash: true })
);


http.createServer(app).listen(app.get('port'), function(){
  console.log('SGI Core server listening on port ' + app.get('port'));
});
