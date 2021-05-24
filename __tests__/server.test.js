'use strict';

require('dotenv').config();
const supergoose = require('@code-fellows/supergoose');
const { app } = require('../src/server.js');
const request = supergoose(app);
const base64 = require('base-64');

test('should get a welcome message', async () => {
  const response = await request.get('/');
  expect(response.status).toBe(200);
  expect(response.text).toBe('welcome in server.js :)');
});

test('wrong method', async () => {
  const response = await request.delete('/signup');
  expect(response.status).toEqual(404);
});