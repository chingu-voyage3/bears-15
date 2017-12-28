const express = require('express');
const routes = require('./routes/index');

const app = express();


// load routes
app.use('/', routes);

module.exports = app;
