const createAPI = require('./api');
const http = require('http');
let args = 'prod';
if(process.argv.length > 2) {
	args = process.argv[2];
}
module.exports = http.createServer(createAPI(args));
