const REGINALD_FILENAME = /@@filename\(\w+.\w+\)@@/gi;

module.exports.parseFileDirective = function(fileContent) {
	const fileDirective = fileContent.match(REGINALD_FILENAME);
	if(!fileDirective) {
		return null;
	}
	const fileName = fileDirective[0].split('(').pop().split(')').shift();
	return {
		name: fileName,
		content: fileContent.replace(REGINALD_FILENAME, '')
	}
}
