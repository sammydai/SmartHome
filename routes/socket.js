var express = require('express');
var router = express.Router();
router.get('/socket',function(req,res){
  res.render('socket');
});
module.exports = router;