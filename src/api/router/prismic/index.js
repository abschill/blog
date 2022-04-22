require('dotenv').config();
const Prismic = require('@prismicio/client');
const prismicDOM = require('prismic-dom');
const url = process.env.prismic_url;
const token = process.env.prismic_key;
async function getArticleId(path) {
    try {
        const api = await Prismic.getApi(url, {token});
        const docs = await api.query( [
            Prismic.predicates.at('document.type', 'article'), Prismic.predicates.at('my.article.uid', path)
        ] );
        const ret = docs?.results[0];
        ret.data.content = prismicDOM.RichText.asHtml( ret.data.content );
        return ret; 
    }
    catch(e) {
        return e;
    }
}

async function getArticles({...opts}) {
    try {
        const api = await Prismic.getApi(url, {token});
        const docs = await api.query([Prismic.predicates.at( 'document.type', 'article' ) ], {orderings: '[my.article.created desc]'});
        if(!opts){
            return docs.results;
        }
        if(opts.urlData) {
            return docs.results.map(res => {
                 return { 
                        icon: res.data.icon.url, 
                        date: res.data.created, 
                        desc: res.data.description,
                        title:res.data.title,
                        tags: res.tags.join(','),
                        href: res.uid
                    } 
                }); 
        }
    }
    catch ( e ) {
        return e;
    }
}
async function getTagList() {
    try {
        const api = await Prismic.getApi(url, {token});
        const _set = new Set(api.tags);
        return [..._set]; 
    }
    catch ( e ) {
        return e;
    }
}
module.exports = { getArticleId, getArticles, getTagList };