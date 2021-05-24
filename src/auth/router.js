'use strict';
const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const User = require ('./models/users-model.js');
const signInAuth = require('./middleware/basic.js');

router.post('/signIn', signInAuth, signInHandler);

router.post('/signup', async (req, res) => {
  try {
      const { username, password } = req.body;
      const hash = await bcrypt.hash(password, 10);
      const user = new User({ username, password: hash });
      const record = await user.save();
      res.status(201).json(record);
  } catch (error) {
      res.status(403).json({ error: error.message });
  }
});


async function signInHandler(req, res) {
  res.status(201).json(req.user);
};




module.exports = router;









