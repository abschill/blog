const createAPI = require('./api');
const http = require('http');
module.exports = http.createServer(createAPI(process.argv[2] ?? null));
