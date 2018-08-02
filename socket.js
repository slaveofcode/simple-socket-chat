'use strict'

const connectionHandler = (io) => {
  io.on('connection', socket => {

    socket.join('myRoom');

    console.log('made a socket connection: ', socket.id);

    socket.emit('intro', { hello: "Hi, welcome to the socket world" });
    socket.on('incoming-user', function(){
      socket.broadcast.emit('new-user-joined');
    })

    socket.on('bar', data => {
      console.log('Incoming pings event: ', data);
    });

    socket.on('chat-message', data => {
      console.log('Incoming message: ', data);
      socket.broadcast.emit('chat-incoming', { name: data.name ? data.name : 'no name', message: data.message })
    });

    socket.on('disconnect', () => {
      socket.broadcast.emit('user-disconnected');
    });

  });
}

module.exports = {
  connectionHandler
}
