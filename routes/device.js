var express = require('express');
var router = express.Router();

var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/smarthome');
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function(callback) {
  console.log('mongoose opened!');
  var deviceSchema=new mongoose.Schema({
  	name:String,
  	power:{type:Number,default:0},
  	devicestatus:{type:Boolean,default:false},
  	time:{type:Date,default:Date.now}
  },
  {collection:'device'}
  );
 var Device=mongoose.model('device',deviceSchema);
 });



/*function Device(name){
	this.name=name;
}

Device.save=function(callback){
	var device={
		name:this.name
	};
	db.once('open',function(callback){
		var =new Device();
	});
}
*/


router.get('/device',checkLogin);
router.get('/device',function(req,res){
	res.render('device',{
		title:'Device',
		user:req.session.user,
		success:req.flash('success').toString(),
		error:req.flash('error').toString()
	});
});


function checkLogin(req,res,next){
	if (!req.session.user) {
		req.flash('error','未登录！');
		res.redirect('/login');
	}

	next();
}

module.exports = router;








/*
	Post.get(null,function(err,posts){
		if (err) {
			posts=[];
		}
	res.render('device',{
		title:'Device',
		user:req.session.user,
		posts:posts,
		success:req.flash('success').toString(),
		error:req.flash('error').toString()
		});
	});
});
*/



