const express = require('express');
const PrismicUtils = require( './prismic' );
const router = express.Router();
const path = require('path');

router.get('/', async (req, res) => {
    const prismicRes0 = await PrismicUtils.getTagList();
    const prismicRes1 = await PrismicUtils.getArticles( { urlData: true } );
    return res.send(req.app.loader.template('home', { tags: prismicRes0, homeLinks: prismicRes1 }));
});

router.get('/about', (req, res) => {
	return res.send(req.app.loader.template('about'));
});

router.get( '/manifest.json', ( req, res ) => {
    return res.sendFile(path.resolve(process.cwd(), 'manifest.json'));
} );

module.exports = router;
