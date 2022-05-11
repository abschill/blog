const baseLoaderConfig = {
	pathRoot: 'views',
	partials: 'layout',
	partialInput: {
        meta_title: `abschill's blog`,
        meta_desc: 'tutorials for full stack software engineering and some rants',
        icon: 'https://d24hicsohgfvzu.cloudfront.net/assets/logo144.png',
        og_img: 'https://d24hicsohgfvzu.cloudfront.net/assets/logo512.png',
    }
}

const baseLoaderOptions = {
	...baseLoaderConfig,
	templates: 'pages'
}

const mdLoaderOptions = {
	...baseLoaderConfig,
	templates: '.content'
}

module.exports = {baseLoaderOptions, mdLoaderOptions};
