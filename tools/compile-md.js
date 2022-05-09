const { marked } = require('marked');
const { JSDOM } = require('jsdom');
const {
	readFileSync,
	writeFileSync,
	existsSync,
	readdirSync
} = require('fs');
const { resolve, join } = require('path');
const filterContent  = require('./utils/filter-content');
const { parseFileDirective } = require('./utils/parse-directive');
const { prependPartial, appendPartial } = require('./utils/add-hcl-partial');
const contentPath = join(process.cwd(), 'content');
const {
	_outPath,
	articleClose,
	articleOpen,
	mainOpen,
	mainClose
} = require('./utils/constants');

marked.setOptions({
	smartypants: true
});

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
	// get the filename from the special syntax we created in our top level for the md;
	const { name, content } = parseFileDirective(pageMarkdown);
	const pageHTML = marked.parse(content);
	const vdom = new JSDOM(pageHTML);
	let validHTML = vdom.window.document.body.innerHTML;
	const hasMain = validHTML.includes(mainOpen)
	const hasArticle = validHTML.includes(articleOpen);
	if(!hasArticle) {
		validHTML = `${articleOpen}\n\t` + validHTML + `\n\t${articleClose}`;
		if(!hasMain) {
			validHTML = `${mainOpen}\n\t` + validHTML + `\n\t${mainClose}`;
		}
	}

	validHTML = prependPartial(validHTML, '<!--@partial=head--><!--@partial=nav-->');
	validHTML = appendPartial(validHTML, '<!--@partial=scripts-->');
	const outPath = resolve(_outPath, name);
	writeFileSync(outPath, validHTML);
	console.log(`File Written: ${name}`);
});
