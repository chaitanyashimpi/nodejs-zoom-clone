// initialize express
const express = require('express');
const app = express();
// create a server instance
const server = require('http').Server(app);

// Create instance of socket io by passing the server to it
const io = require('socket.io')(server);

// import UUID (used to create a unique id for each room)
const { v4: uuidv4 } = require('uuid');

const { ExpressPeerServer } = require('peer');
const peerServer = ExpressPeerServer(server, {
  debug: true,
});

// set view engine to ejs
app.set('view engine', 'ejs');

// set the static public files reference
app.use(express.static('public'));

app.use('/peerjs', peerServer);
app.get('/', (req, res) => {
  // Print Message
  //   res.status(200).send('Hello World');
  // Render Project
  //   res.render('room');
  res.redirect(`/${uuidv4()}`); //Automatically genrates the uuid and will redirect you to localhost:3030/roomId
});

// Cretae a new URL
app.get('/:room', (req, res) => {
  res.render('room', { roomId: req.params.room });
});

// Start connection with io
io.on('connection', (socket) => {
  socket.on('join-room', (roomId, userId) => {
    socket.join(roomId);
    socket.broadcast.to(roomId).emit('user-connected', userId);

    socket.on('message', (message) => {
      io.to(roomId).emit('createMessage', message);
    });
  });
});

// run the server on given port
server.listen(process.env.PORT || 3030);
