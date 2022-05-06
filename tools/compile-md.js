const { marked } = require('marked');
const {
	readFileSync,
	writeFileSync,
	existsSync,
	readdirSync
} = require('fs');

marked.setOptions({
	smartypants: true
});
const { resolve, join } = require('path');
const filterContent  = require('./utils/filter-content');
const { parseFileDirective } = require('./utils/parse-directive');
const contentPath = join(process.cwd(), 'content');
const _outPath = '.content';

if(!existsSync(contentPath)) {
	throw new Error('content path is invalid at <cwd>/content');
}

const contentPages = filterContent(readdirSync(contentPath));

if(!contentPages || contentPages.length === 0) {
	process.emitWarning('nothing compiled/discovered');
	process.exit(0);
}

contentPages.forEach(validPage => {
	// file mapped to the absolute url for resolution
	const pagePath = resolve(contentPath, validPage);
	const pageMarkdown = readFileSync(pagePath).toString();
	const { name, content } = parseFileDirective(pageMarkdown);
	const pageHTML = marked.parse(content);
	const outPath = resolve(_outPath, name);
	writeFileSync(outPath, pageHTML);
	console.log(`File Written: ${name}`);
});
