'use strict';
var express = require('express');
var port = 9500;
var app = express();
app.use(express.static('public'));
app.use('/jquery', express.static('node_modules/jquery/dist'));
app.use('/bootstrap', express.static('node_modules/bootstrap/dist'));
// Listen on `port` (later proxied with nginx).
app.listen(port);
console.log('listening on port', port);
