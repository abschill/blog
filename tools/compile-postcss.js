const postcss = require('postcss');
const fs = require('fs');
const minify = require('postcss-minify');
const fp = './web/styles/css/style.css';
fs.readFile(fp, (err, css) => {
	postcss([minify]).process(css, { from: fp, to: fp })
	.then(res => {
		fs.writeFile(fp, res.css, () => true);
	});
});
