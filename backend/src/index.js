const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
const cors = require('cors');

const app = express();

const server = require('http').Server(app);
const io = require('socket.io')(server);

mongoose.connect(
  'mongodb+srv://gustavo:root10@cluster0-s2yiv.mongodb.net/test?retryWrites=true&w=majority',
  {
    useNewUrlParser: true,
  },
);

app.use((req, res, next) => {
  req.io = io;
  next();
});

app.use(cors());

app.use(
  '/file',
  express.static(path.resolve(__dirname, '..', 'uploads', 'resized')),
);

app.use(require('./routes'));

server.listen('7777');
