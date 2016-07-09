var mongodb=require('./db');


function Post(name,title,post) {
	this.name=name;
	this.title=title;
	this.post=post
}

module.exports=Post;

Post.prototype.save=function(callback){
	var post={
		name:this.name,
		title:this.title,
		post:this.post
	};
	mongodb.open(function(err,db){
		if (err) {
			return callback(err);
		}
		db.collection('posts',function(err,collection){
			if (err) {
				mongodb.close();
				return callback(err);
			}
			collection.insert(post,{
				safe:true
			},function(err){
				mongodb.close();
				if (err) {
					return callback(err);
				}
				callback(null);
			});
		});
	});
};

Post.removeItem=function(callback){
	mongodb.open(function(err,db){
		if (err) {
			return callback(err);
		}
		db.collection('posts',function(err,collection){
			if (err) {
				mongodb.close();
				return callback(err);
			}
			collection.remove({"title" : "toolbar"},{
				safe:true
			},function(err){
				mongodb.close();
				if (err) {
					return callback(err);
				}
				callback(null);
			});
		});
	});
};

Post.updateItem=function(callback){
	mongodb.open(function(err,db){
		if (err) {
			return callback(err);
		}
		db.collection('posts',function(err,collection){
			if (err) {
				mongodb.close();
				return callback(err);
			}
			collection.update({"title" : "0611"},{
				$set:{"status":0}
			},
			{
				safe:true
			},function(err){
				mongodb.close();
				if (err) {
					return callback(err);
				}
				callback(null);
			});
		});
	});
};








Post.get=function(name,callback){
	mongodb.open(function(err,db){
		if (err) {
			return callback(err);
		}
	db.collection('posts',function(err,collection){
		if (err) {
			mongodb.close();
			return callback(err);
		}
		var query={};
		if (name) {
			query.name=name;
		}
		collection.find(query).toArray(function(err,docs){
			mongodb.close();
			if (err) {
				return callback(err);
			}
			callback(null,docs);
		});
	});
	});
};

