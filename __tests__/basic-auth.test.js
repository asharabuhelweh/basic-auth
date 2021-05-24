
'use strict';

require('dotenv').config();
const supergoose = require('@code-fellows/supergoose');
const { app } = require('../src/server.js');
const request = supergoose(app);
const base64 = require('base-64');

let user={
  username: 'ashar',
  password: '1111',
};

describe('authentication test', () => {

  it('should create a new User on POST /signup', async () => {
    const response = await request.post('/signup').send(user);
    expect(response.status).toEqual(201);
    expect(response.body.username).toEqual('ashar');
  });

  it('should Sign In test',async ()=>{
  
    const user = base64.encode('ashar:1111');
    const response1 = await request.post('/signin').set('Authorization', `Basic ${user}`);
    expect(response1.status).toEqual(201);
    expect(response1.body.username).toEqual('ashar');
    expect(response1.body.password).not.toEqual('1111');
  });
  
it('Test wrong password', async () => {
  const response = await request
    .post('/signin')
    .set(
      'Authorization','basic ' + new Buffer.from(`${user.username}:${111}`, 'utf8').toString('base64'),
    );
  expect(response.status).toEqual(500);
});

it('Test wrong username', async () => {
  const response = await request
    .post('/signin')
    .set(
      'Authorization','basic ' + new Buffer.from(`ashar1: ${user.password}`, 'utf8').toString('base64'),
    );
  expect(response.status).toEqual(403);
});

  
});