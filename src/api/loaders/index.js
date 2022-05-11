const baseLoaderOptions = {
	pathRoot: 'views',
	templates: 'pages',
	partials: 'layout',
	partialInput: {
        meta_title: `abschill's blog`,
        meta_desc: 'tutorials for full stack software engineering and some rants',
        icon: 'https://d24hicsohgfvzu.cloudfront.net/assets/logo144.png',
        og_img: 'https://d24hicsohgfvzu.cloudfront.net/assets/logo512.png',
    }
}

const mdLoaderOptions = {
	pathRoot: 'views',
	templates: '.content',
	partials: 'layout',
	partialInput: {
        meta_title: `abschill's blog`,
        meta_desc: 'tutorials for full stack software engineering and some rants',
        icon: 'https://d24hicsohgfvzu.cloudfront.net/assets/logo144.png',
        og_img: 'https://d24hicsohgfvzu.cloudfront.net/assets/logo512.png',
    }
}

module.exports = {baseLoaderOptions, mdLoaderOptions};
