let rooms = {

};
let express = require('express');
let app = express();
app.set('view engine', 'ejs');
const httpServer = require('http').createServer(app);
// const socket = require('soclet.io')
let io = require('socket.io');
io = new io.Server(httpServer);

// socket io
io.on('connection', (socket) => {
  console.log('new connection', socket.id);

  // on socket disconnect
  socket.on('disconnect', ()=> {
    console.log('ended connection', socket.id);
  })

  // When socket receives joinRoom, add the room and username details to the socketr
  // emit a message to ALL the clients in this room letting them know that
  // there is anew user
  socket.on('joinRoom', (data) => {
    let roomName = data.roomName;
    let userName = data.userName;
    socket.join(roomName);
    socket.room = roomName;
    socket.name = userName;
    console.log(userName + ' joined room ' + roomName);
    io.to(roomName).emit("joinedRoom", {
      name: userName,
      room: roomName
    });

    //populate the "rooms" object
    rooms[roomName] = {"leader":null}
    console.log(rooms);
  })

  //when the leader is set, add the sid to the particular room in the "rooms"object
  socket.on('leaderSet',() => {
    console.log('hello');
    rooms[socket.room].leader = socket.id;
    console.log(rooms);
    socket.broadcast.to(socket.room).emit("leaderSet")
  })
})



// serve static page
app.use('/', express.static('public'));

httpServer.listen(3000, function() {
   console.log('listening on *:3000');
});
