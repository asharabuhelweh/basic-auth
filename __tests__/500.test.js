'use strict';
require('dotenv').config();
const supergoose = require('@code-fellows/supergoose');
const { app } = require('../src/server.js');
const request = supergoose(app);

describe('server', () => {
  it('should get 404 status', async () => {
    const response = await request.get('/loo');
    expect(response.status).toBe(404);
  });

  
 
  

});