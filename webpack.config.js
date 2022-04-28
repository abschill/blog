const path = require( 'path' );
module.exports = {
	entry: './js/page.js',
    module: {
        rules: [
            {
                test: /\.js$/,
                use: 'swc-loader',
                exclude: /node_modules/
            }
        ]
    },
    output: {
        filename: 'bundle.js',
        path: path.resolve(__dirname, 'js'),
    },
    target: 'web',
}
