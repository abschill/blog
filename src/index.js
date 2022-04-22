const api = require('./api');
const http = require('http');

module.exports = http.createServer(api);