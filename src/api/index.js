const express = require('express');
const { join, resolve } = require('path');
const loader = require('html-chunk-loader');

// bring in the router for the main site content
const SiteRouter = require('./router');
// import our 2 loader variants
const { mdLoaderOptions, baseLoaderOptions } = require('./loaders');
const api = express();
// set a property on the api object that allows us to access the process path as an attribute in any scope the api will be in such as middleware in other files 
api.cwd = process.cwd();

// set the content type to css if its in that directory and continue to process request
api.use((req, res, next) => {
	if(req.path.includes('/css')) res.set('Content-Type', 'text/css');
	next();
});
// bind assets href to the src/assets directory
api.use('/assets', express.static(join(api.cwd, 'src/assets')));
// consume that middleware with the href but setve from the path
api.use('/css', express.static(join(api.cwd, 'styles/css')));
api.use('/js', express.static(join(api.cwd, 'js')));
api.get('/manifest.json', ( _, res ) => res.sendFile(resolve(process.cwd(), 'manifest.json')));
// integrate router above the error catch
api.use(SiteRouter);

// catch any unresolved requests from the defined paths
api.all('*', (req, res) => res.send(mainLoader.template('error')));

// runtime mode from process inline args
const foundMode = process.argv[2];

// create loaders from the option sets and watch if the mode is dev
const mainLoader = loader({
	...baseLoaderOptions,
	watch: (typeof(foundMode) === 'string' && foundMode === 'dev')
});

const mdLoader = loader({
	...mdLoaderOptions,
	watch: (typeof(foundMode) === 'string' && foundMode === 'dev')
});

// bind them to the express application

api.loader = mainLoader;
api.mdLoader = mdLoader;

module.exports = api;
