// Jai Shree Ram
// Node server which will handle socket io connections
// I have taken 50 port for client and 8000 port for server
const http = require('http');
const express = require('express')
const socketIO = require('socket.io');
const cors = require('cors');
const path = require('path')
const app = express();
app.use(cors());

const server = http.createServer(app);
const io = socketIO(server, {
    cors: {
      origin: "http://localhost:5005",
      methods: ["GET", "POST"]
    }
  });
app.set('view engine', 'pug');
app.set('views', path.join(__dirname, '/static/pug'))
// app.use(cors());
app.use('/static', express.static('static'));
app.get('/', (req,res)=>{
    res.status(200).render('index.pug');
})

const users = {};
// io.on --> It will handle all the users(or we can say it will handle the whole connection)
io.on('connection', socket => {
    // This socket.on give a message to other users that someone joined the chat
    socket.on('new-user-joined', name => {
        // We will store the name into user with a unique id
        users[socket.id] = name;
        // broadkast.emit --> It will send a message that 'name' joined the chat 
        socket.broadcast.emit('user-joined', name);
    })

    // Now if a user send a message then we have to handel that message and pass it to other users
    socket.on('send', message => {
        socket.broadcast.emit('recieve', {message:message, name:users[socket.id]});
    })

    // When someone left the chat
    socket.on('disconnect', message => {
      socket.broadcast.emit('left', users[socket.id]);
      delete users[socket.id];
    })

})


server.listen(5001, () => {
    console.log('Server is running on port 5001');
  });