const express = require('express');
const { join, resolve } = require('path');
const loader = require('html-chunk-loader');
const SiteRouter = require('./router');
const { mdLoaderOptions, baseLoaderOptions } = require('./loaders');
const api = express();
api.cwd = process.cwd();
api.use((req, res, next) => {
	if(req.path.includes('/css')) res.set('Content-Type', 'text/css');
	next();
});

api.use('/assets', express.static(join(api.cwd, 'src/assets')));
api.use('/css', express.static(join(api.cwd, 'styles/css')));
api.use('/js', express.static(join(api.cwd, 'js')));
api.get('/manifest.json', ( _, res ) => res.sendFile(resolve(process.cwd(), 'manifest.json')));
api.use(SiteRouter);
api.all('*', (req, res) => res.send(mainLoader.template('error')));

const foundMode = process.argv[2];

const mainLoader = loader({
	...baseLoaderOptions,
	watch: (typeof(foundMode) === 'string' && foundMode === 'dev')
});

const mdLoader = loader({
	...mdLoaderOptions,
	watch: (typeof(foundMode) === 'string' && foundMode === 'dev')
});

api.loader = mainLoader;
api.mdLoader = mdLoader;

module.exports = api;
