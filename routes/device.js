var express = require('express');
var router = express.Router();
var Device=require('../models/device');

 /*Device.find({name:'testformongodbmodel'},function(err,device){
  console.log('this is from device page:device');
  console.log(device);
  console.log('findsuccess!');
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

Device.findOne({name:'testformongodbmodel'},function(err,device){
  console.log('this is from device page:device');
  console.log(device.time);
  console.log(device.power);
  console.log('findsuccess!');
  	res.render('device',{
		title:'Device',
		powerrate:device.power,
		time:device.time,
		user:req.session.user,
		success:req.flash('success').toString(),
		error:req.flash('error').toString()
	});

 });


});

var devicedata=Device.findOne();

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



