// initialize express
const express = require('express');
const app = express();
// create a server instance
const server = require('http').Server(app);

// import UUID (used to create a unique id for each room)
const { v4: uuidv4 } = require('uuid');

// set view engine to ejs
app.set('view engine', 'ejs');

// set the static public files reference
app.use(express.static('public'));

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

// run the server on given port
server.listen(3030);
