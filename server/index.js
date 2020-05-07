let app = require('express')();
let server = require('http').createServer(app);
let io = require('socket.io')(server);

const port = process.env.PORT || 3000;

io.on('connection', (socket) => {
    io.emit('this', {will: 'be recieved by everyone'});
    
    socket.on('private message', (from, msg) => {
        console.log('I received a private message by ', from, ' saying ', msg);
    });

    socket.on('disconnect', () => {
        io.emit('user disconneccted');
    });
});

server.listen(port, () => {
    console.log(`started on port: ${port}`);
});
