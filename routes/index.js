var express = require('express');
var router = express.Router();
var crypto=require('crypto');
var User=require('../models/user.js');
var Post=require('../models/post.js');

//var Device=require('../models/device.js');


/* GET home page. set homepage=index.ejs*/
router.get('/', function(req, res) {
	res.render('index', { 
		title: 'Express',
		user:req.session.user,
		success:req.flash('success').toString(),
		error:req.flash('error').toString()
		});
});

/*SET Register Page reg.ejs*/
router.get('/reg',checkNotLogin);
router.get('/reg',function(req,res){
	res.render('reg',{
		title:'Register',
		user:req.session.user,
		success:req.flash('success').toString(),
		error:req.flash('error').toString()
		});
});

router.post('/reg',checkNotLogin);
router.post('/reg',function(req,res){
	var name=req.body.name;
	var password=req.body.password;
	var password_re=req.body['password-repeat'];
	if (password_re!=password) {
		req.flash('error','两次输入的密码不一致');
		return res.redirect('/reg');
	}

	var md5=crypto.createHash('md5');
	var	password=md5.update(req.body.password).digest('hex');
	var newUser=new User({
		name: name,
		password:password,
	});
	User.get(newUser.name,function(err,user){
		if (err) {
			req.flash('error',err);
			return res.redirect('/');
		}
		if(user){
			req.flash('error','用户已存在！');
			return res.redirect('/reg'); 
		}
	newUser.save(function(err,user){
		if (err) {
			req.flash('error',err);
			return res.redirect('/reg');
		}
		req.session.user=newUser;
		req.flash('success','注册成功！');
		res.redirect('/');
	});
	});
});

/*SET* Login Page login.ejs*/
router.get('/login',checkNotLogin);
router.get('/login',function(req,res){
	res.render('login',{
		title:'Login',
		user:req.session.user,
		success:req.flash('success').toString(),
		error:req.flash('error').toString()
	});
});

router.post('/login',checkNotLogin);
router.post('/login',function(req,res){
	var md5=crypto.createHash('md5');
	var password=md5.update(req.body.password).digest('hex');
	User.get(req.body.name,function(err,user){
		if (!user) {
			req.flash('error','用户不存在！');
			return res.redirect('/login');
		}
		if (user.password!=password) {
			req.flash('error','密码错误！');
			return res.redirect('/login');
		}
		req.session.user=user;
		req.flash('success','登录成功！欢迎来到SmartHome');
		res.redirect('/');
	});

});

router.get('/logout',checkLogin);
router.get('/logout',function(req,res){
	req.session.user=null;
	req.flash('success','登出成功！');
	res.redirect('/');

});

	/*
router.get('/device',checkLogin);
router.get('/device',function(req,res){
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

//############this is function for check Login Logout###########
function checkLogin(req,res,next){
	if (!req.session.user) {
		req.flash('error','未登录！');
		res.redirect('/login');
	}
	next();
}

function checkNotLogin(req,res,next){
	if (req.session.user) {
		req.flash('error','已登录！');
		res.redirect('/');
	}
	next();
}



module.exports = router;
