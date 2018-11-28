const express = require('express');
const http = require('http');
const path = require('path');
const socketIO = require('socket.io');


const publicPath = path.join(__dirname, '../public');
const port = process.env.PORT || 3000;

const app = express();
const server = http.createServer(app);
const io = socketIO(server);

io.on('connection', (socket) => {
  console.log(`new user connected`); 

  socket.on('disconnect', () => {
    console.log('client disconnected');
  });
});

app.use(express.static(publicPath));

server.listen(port, () => {
  console.log(`listening on ${port}`); 
});

