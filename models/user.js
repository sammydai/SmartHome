var mongodb=require('./db');

function User(user) {
	this.name=user.name;
	this.password=user.password;
};
module.exports=User;

User.prototype.save=function(callback){
	//save to Mongodb files
	var user={
		name: this.name,
		password: this.password,
	};
	mongodb.open(function(err,db){
		if(err){
			return callback(err);
		}
	//read users collection
	db.collection('users',function(err,collection){
		if (err) {
			mongodb.close();
			return callback(err);
		}
	//write to user file
	collection.insert(user,{
		safe:true
	},function(err,user){
		mongodb.close();
		if (err) {
			return callback(err);
		}
		callback(null,user[0]);
	});
	});
	});
};

//
User.get=function(name,callback){
	mongodb.open(function(err,db){
		if (err) {
			return callback(err);
		}
	db.collection('users',function(err,collection){
		if (err) {
			mongodb.close();
			return callback(err);
		}
	collection.findOne({
		name:name
	},function(err,user){
		mongodb.close();
		if (err) {
			return callback(err);
		}
		callback(null,user);
	});
	});
	});
};