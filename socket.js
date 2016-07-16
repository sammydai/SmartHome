var io = require('socket.io')();

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

