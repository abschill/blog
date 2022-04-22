const path = require( 'path' );
module.exports = {
    entry: {
        components:'./components/index.js',
        articles:'./pages/articles/index.js',
        article:'./pages/articles/article/index.js',
        page: './pages/page.js'
    },
    module: {
        rules:[
            {
                test:/\.js$/,
                use:'babel-loader',
                exclude:/node_modules/
            }
        ]
    },
    output: {
        filename:'[name].js',
        path: path.resolve( __dirname, 'public' ),
    },
    target: 'web',
}