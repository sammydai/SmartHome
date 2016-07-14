  var socket = io();
  $('.mytest').submit(function(){
    socket.emit('chat message', $('#m').val());
    $('#m').val('');
    return false;
  });

socket.on('chat message', function(msg,time){
    $('.powerrate:gt(0)').text(msg);
    $('.updatetime:gt(0)').text(time);
  });































var mongodb=require('../../models/db');


function Post(name,title,post) {
	this.name=name;
	this.title=title;
	this.post=post
}

module.exports=Post;

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
			collection.remove({"title" : "0611"},{
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



