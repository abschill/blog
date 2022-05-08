const contentExtensions = [
	'.md',
	'.mdx',
	'.html'
];
// not sure if ill use other types but why not
module.exports = (fileList) => fileList.filter(file => {
	// check if any of the extension types are parsable in the defined options
	const matches = contentExtensions.filter(ext => file.includes(ext));
	return matches.length > 0;
});

