
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
app.use(app.router);
app.use(require('less-middleware')({ src: __dirname + '/public' }));
app.use(express.static(path.join(__dirname, 'public')));

// development only
if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}

app.get('/', routes.index);
//app.post('/saveData', routes.index);
app.post('/save', data.save);
app.post('/menus', data.menus);

http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});
