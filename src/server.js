'use strict';
const express = require('express');
const app = express();
const mongoose = require('mongoose');
const cors=require('cors');
const bcrypt = require('bcrypt');
const base64 = require('base-64');
const router=require('./auth/router.js');

const notFoundHandler = require('./middleware/404.js');
const errorHandler = require('./middleware/500.js');

app.use(express.json());

app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use('/' , router);

app.get('/', homeHandler);
app.get('/bad', badHandler);
//functions

function homeHandler(req, res) {
    res.send('welcome in server.js :)');
}

function badHandler(req, res) {
    throw new Error('something went wrong!');
  }
app.use(errorHandler);
app.use('*', notFoundHandler);

function start (PORT){
  app.listen(PORT,()=>{
    console.log(`app is listening on PORT ${PORT}`);
  });
}
  
module.exports={
  app:app,
  start:start
};





