const express = require('express');
const prismic = require('./prismic');
const router = express.Router();
async function data( id ) {
    //load data
    const article = await prismic.getArticleId( id );
    const title = article?.data?.title?.replace( /\u00A0/g, ' ');
    const date = article?.data?.created;
    const article_icon = article?.data?.icon?.url;
    const description = article?.data?.description?.replace( /\u00A0/g, ' ');
    const content = article?.data?.content?.replace( /\u00A0/g, ' ');
    return {
        title,
        description,
        date,
        article_icon,
        content
    }
}

router.get('/', async (req, res) => {
    const prismicRes0 = await prismic.getTagList();
    const prismicRes1 = await prismic.getArticles( { urlData: true } );
    return res.send(req.app.loader.template('home', { tags: prismicRes0, homeLinks: prismicRes1 }));
});

router.get('/about', (req, res) => {
	return res.send(req.app.loader.template('about'));
});

router.get( '/articles/:id', async ( req, res ) => {
    const article = await data( req.params.id );
    res.send( req.app.loader.template( 'article', { partialInput: {
        meta_title: article.title,
        meta_desc:  article.description,
        og_img: article.article_icon
    }, ...article } )  );

} );
module.exports = router;
