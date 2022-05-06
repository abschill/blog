module.exports.prependPartial = function(content, partialContent) {
	return partialContent + '\n' + content;
}

module.exports.appendPartial = function(content, partialContent) {
	return content + '\n' + partialContent;
}
