var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/smarthome');
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function(callback) {
  console.log('socket mongoose opened!');
 });


var deviceSchema=new mongoose.Schema({
    name:String,
    power:{type:Number,default:0},
    devicestatus:{type:Boolean,default:false},
    time:{type:String,default:Date.now}
  },
  {collection:'device'}
  );

 deviceSchema.methods.speak=function(){
  console.log('this is my name'+this.name);
 }

 var Device=mongoose.model('device',deviceSchema);

module.exports = Device;


/*
 var testEntity=new Device({name:'this is test socket outside the function'});
 testEntity.speak();
 console.log(testEntity.name);
 testEntity.save();


*/


/*
 Device.find({name:'testformongodb'},function(err,docs){
  console.log(docs);
  console.log('findsuccess!');
 });
*/



