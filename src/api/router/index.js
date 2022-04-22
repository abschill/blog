const express = require('express');
const PrismicUtils = require( './prismic' );
const router = express.Router();

router.get( '/', async (req, res) => {
    const prismicRes0 = await PrismicUtils.getTagList();
    const prismicRes1 = await PrismicUtils.getArticles( { urlData:true } );
    res.send(req.app.loader.template('home', { tags: prismicRes0, homeLinks: prismicRes1 }));
});


module.exports = router;