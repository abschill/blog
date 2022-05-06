const contentExtensions = [
	'.md',
	'.mdx',
	'.html'
];

module.exports = function filterContent(fileList) {

	return fileList.filter(file => {
		// check if any of the extension types are parsable in the defined options
		const matches = contentExtensions.filter(ext => file.includes(ext));
		return matches.length > 0;
	})
}
