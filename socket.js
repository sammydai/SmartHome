var io = require('socket.io')();
var Device=require('./models/device');

io.on('connection', function(_socket){
  console.log('a user connected');
  _socket.on('disconnect', function(){
    console.log('user disconnected');
  });
});


io.emit('some event', { for: 'everyone' });

io.on('connection',function(socket){
  socket.emit('news',{hello:'this is server from windows'});
  socket.on('my other event', function (data) {
    console.log(data);

  });
  socket.on('toServer',function(randomNum){
    console.log(randomNum);
    var time=getTime();

   var condition={name:'testformongodbmodel'};
   var update={$set:{power:randomNum,time:time}};
   Device.findOneAndUpdate(condition,update,function(err,callback){
    console.log('update done!');
   });    
    io.emit('toServer',randomNum,time);
  });
  });


var getTime=function(){
  var date = new Date();
  return date.toLocaleString();
}


exports.listen = function (_server) {
    return io.listen(_server);
};


/*
 Device.find({name:'testformongodb'},function(err,docs){
  console.log(docs);
  console.log('findsuccess!');
 });
*/

/*    var testmongodb=new Device({
      time:time,
      power:randomNum,
      name:'testformongodbmodel'});
    testmongodb.save();
*/