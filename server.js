// initialize express
const express = require('express');
const app = express();
// create a server instance
const server = require('http').Server(app);

// set view engine to ejs
app.set('view engine', 'ejs');

app.get('/', (req, res) => {
  // Print Message
  //   res.status(200).send('Hello World');
  // Render Project
  res.render('room');
});

// run the server on given port
server.listen(3030);
