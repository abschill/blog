const api = require('./src');
let args = 'prod';
if(process.argv.length > 2) {
	args = process.argv[2];
}
api.listen(3000);
