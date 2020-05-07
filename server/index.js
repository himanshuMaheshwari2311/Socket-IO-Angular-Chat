let app = require('express')();
let server = require('http').createServer(app);
let io = require('socket.io')(server);

const port = process.env.PORT || 3000;

io.on('connection', (socket) => {
    console.log('user connected');
});

server.listen(port, () => {
    console.log(`started on port: ${port}`);
});
