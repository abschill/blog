const express = require('express');
const prismic = require('./prismic');
const router = express.Router();

async function data(id) {
    const article = await prismic.getArticleId(id);
    const title = prismic.cleanStupidText(article?.data?.title);
    const date = article?.data?.created;
    const article_icon = article?.data?.icon?.url;
    const description = prismic.cleanStupidText(article?.data?.description);
    const content = prismic.cleanStupidText(article?.data?.content);
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

router.get('/about', (req, res) => res.send(req.app.loader.template('about')));

router.get('/articles/:id', async (req, res) => {
    const article = await data(req.params.id);
	if(article) {
		return res.send( req.app.loader.template( 'article', { partialInput: {
			meta_title: article.title,
			meta_desc:  article.description,
			og_img: article.article_icon
		}, ...article } ));
	}
	return res.redirect('/error');
} );
module.exports = router;
