const express = require('express');
const { join, resolve } = require('path');
const loader = require('html-chunk-loader');
const SiteRouter = require('./router');
const api = express();
const mainLoader = loader({
    pathRoot: 'views',
    templates: 'pages',
    partials: 'layout',
    partialInput: {
        meta_title: `abschill's blog`,
        meta_desc: 'tutorials for full stack software engineering and some rants',
        icon: 'https://d24hicsohgfvzu.cloudfront.net/assets/logo144.png',
        og_img: 'https://d24hicsohgfvzu.cloudfront.net/assets/logo512.png',
    },
	watch: true
});

api.cwd = process.cwd();
api.loader = mainLoader;

api.use((req, res, next) => {
	if(req.path.includes('/css')) res.set('Content-Type', 'text/css');
	next();
});
api.use('/assets', express.static(join(api.cwd, 'src/assets')));
api.use('/css', express.static(join(api.cwd, 'styles/css')));

api.get( '/manifest.json', ( req, res ) => {
    return res.sendFile(resolve(process.cwd(), 'manifest.json'));
} );

api.use(SiteRouter);

api.all('*', (req, res) => res.send(mainLoader.template('error')));
module.exports = api;
