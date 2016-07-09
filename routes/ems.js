var express = require('express');
var router = express.Router();
router.get('/ems', function(req, res) {
	res.render('ems', { 
		title: 'EMS',
		user:req.session.user,
		success:req.flash('success').toString(),
		error:req.flash('error').toString(),
		});
});

module.exports = router;
