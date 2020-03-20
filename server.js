const express = require('express');
const postRouter = require('./posts/postRouter.js');
const userRouter = require('./users/userRouter.js');


const server = express();

server.use(express.json());
server.use(methodLogger);

server.use('/api/posts', postRouter);
server.use('/api/users', userRouter);

// endpoints

server.get('/', (req, res) => {
  res.send(`<h2>Let's write some middleware!</h2>`);
});

//custom middleware

function methodLogger(req, res, next) {
  console.log(`${req.method} Request`);
  next();
}

module.exports = server;
