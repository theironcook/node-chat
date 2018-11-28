const socket = io();

socket.on('connect', () => {
  console.log('connected to server');

  socket.emit('createEmail', {
    to: 'naomi@wood.com',
    text: 'Hey girl'
  });  
});

socket.on('disconnect', () => {
  console.log('disconnected from server');
});

socket.on('newEmail', (data) => {
  console.log('New email', data);
});

socket.on('newMessage', (message) => {
  console.log('Got a message ', message);
});