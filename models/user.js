/*
* User Model: user.js
* Coded by: Justin Zimmer
*/
exports.user = function(db){
var User =  db.extend({
	tableName: "user",
});
	return User;
};


