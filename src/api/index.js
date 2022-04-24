const express = require('express');
const path = require('path');
const loader = require('html-chunk-loader');
const SiteRouter = require('./router');
const api = express();
const mainLoader = loader({
    pathRoot: 'views',
    templates: 'pages',
    partials: 'layout',
    partialInput: {
        meta_title: `abschill's blog`,
        meta_desc: 'weird opinions and tutorials for full stack software engineering',
        icon: 'https://d24hicsohgfvzu.cloudfront.net/assets/logo144.png',
        og_img: 'https://d24hicsohgfvzu.cloudfront.net/assets/logo512.png',
    }
});

api.loader = mainLoader;

api.use((req, res, next) => {
	console.log(req.path);
	if(req.path.includes('/css')) res.set('Content-Type', 'text/css');
	next();
});
api.use('/assets', express.static(path.join(process.cwd(), 'src/assets')));
api.use('/css', express.static(path.join(process.cwd(), 'styles/css')));
api.use(SiteRouter);

module.exports = api;
