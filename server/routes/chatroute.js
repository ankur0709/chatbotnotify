var express = require('express');
var app = express();
var router = express.Router();
var mongoose = require('mongoose');
var server = require('http').createServer(app);
var io = require('socket.io')(server);
var Chat = require('../model/Chat.js');


users=[];
connections =[];

server.listen(4000);

//socket io
io.on('connection', function (socket) {
  console.log('User connected');
  socket.on('disconnect', function() {
    console.log('User disconnected');
  });
  socket.on('save-message', function (data) {
    console.log(data);
    io.emit('new-message', { message: data });
  });
});
// io.on('connection', function (socket) {
//   connections.push(socket); 
//   console.log('connected: %s sockets connected',connections.length);

// //disconnect
//   socket.on('disconnect', function(data) {    
//     users.splice(users.indexOf(socket.username),1);
//     connections.splice(connections.indexOf(socket),1);
//     console.log('Disconnected: %s sockets connected',connections.length);
//   });
// });
 

/* GET ALL CHATS */
router.get('/:room', function(req, res, next) {
  console.log('anu');
  Chat.find({ room: req.params.room }, function (err, chats) {
    if (err) return next(err);
    res.json(chats);
  });
});


/* SAVE CHAT */
router.post('/', function(req, res) {
  console.log('anu2');
  Chat.create(req.body, function (err, post) {
    if (err) return next(err);
    res.json(post);
  });
});


module.exports = router;
