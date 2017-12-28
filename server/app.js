const express = require('express');
const app = express();
const routes = require('./routes/index');


// load routes
app.use('/', routes);

module.exports = app;