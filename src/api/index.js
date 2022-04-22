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
// api.use(express.static(path.join(process.cwd(), 'src')));
api.use(SiteRouter);

module.exports = api;