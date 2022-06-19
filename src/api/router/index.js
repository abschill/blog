const express = require('express');
const prismic = require('./prismic');
const router = express.Router();
const { compileData } = require('./prismic');


router.get('/', async (req, res) => {
	// organize the data with the tag info so we can add the filter component back next time I feel like writing css
    const prismicRes0 = await prismic.getTagList();
    const prismicRes1 = await prismic.getArticles( { urlData: true } );
    return res.send(req.app.loader.template('home', { tags: prismicRes0, homeLinks: prismicRes1 }));
});

router.get('/about', (req, res) => res.send(req.app.loader.template('about')));

router.get('/articles/:id', async (req, res) => {
    const article = await compileData(req.params.id);
	if(article) {
		return res.send(req.app.loader.template('article', { partialInput: {
			meta_title: article.title,
			meta_desc:  article.description,
			og_img: article.article_icon
		}, ...article } ));
	}
	// if no prismic article check local for markdown version
	const markdownCheck = req.app.mdLoader.template(req.params.id);
	return markdownCheck ? res.send(markdownCheck):res.redirect('/error');
} );
module.exports = router;
