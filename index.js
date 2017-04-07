var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);

app.get('/', function(req, res) {
  res.sendFile(__dirname + '/index.html');
});




io.on('connection', function(socket) {
  socket.on('chat message', function(msg, screenName){
    console.log('message: ' + msg);
    io.emit('chat message', screenName, msg, screenName);
  });


  socket.on('disconnect', function(socket){
      console.log('user disconnected');
      io.emit('chat message', 'disconnected');
  });

  socket.on('join', function(screenName) {
    console.log('joined');
    socket.screenName = screenName;

  });
});



http.listen(3000, function() {
  console.log('listening on *:3000');
});
