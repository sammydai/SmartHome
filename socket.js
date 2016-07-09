var io = require('socket.io')();

io.on('connection', function(_socket){
  console.log('a user connected');
  _socket.on('disconnect', function(){
    console.log('user disconnected');
  });
});


io.emit('some event', { for: 'everyone' });


io.on('connection', function(socket){
  socket.on('chat message', function(msg){
  	var time=getTime();
    io.emit('chat message', msg,time);
  });
});




var getTime=function(){
  var date = new Date();
  return date.toLocaleString();
}

exports.listen = function (_server) {
    return io.listen(_server);
};