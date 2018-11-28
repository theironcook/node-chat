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

  // socket.emit('newEmail', {
  //   from: 'bart@wood.com',
  //   text: 'wut up yo!?',
  //   createAt: Date.now()
  // });

  // send a welcome to the new user
  socket.emit('newMessage', {
    from: 'Admin',
    text: 'Welcome to the chat beotch!',
    createdAt: Date.now()
  });

  // tell everyone else that a new user just joined the chat
  socket.broadcast.emit('newMessage', {
    from: 'Admin',
    text: 'Some turd just joined',
    createdAt: Date.now()
  });


  socket.on('createEmail', (newEmail) => {
    console.log(`createEmail ${JSON.stringify(newEmail, undefined, 2)}`);
  });

  socket.on('createMessage', (message) => {  
    
    // to everyone but this single socket
    socket.broadcast.emit('newMessage', {
      from: message.from,
      text: message.text,
      createdAt: Date.now()
    });
    
    // io.emit('newMessage', {
    //   from: message.from,
    //   text: message.text,
    //   createdAt: Date.now()
    // });
  });

  socket.on('disconnect', () => {
    console.log('client disconnected');
  });
});

app.use(express.static(publicPath));

server.listen(port, () => {
  console.log(`listening on ${port}`); 
});

