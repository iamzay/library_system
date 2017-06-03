

var HTMLWebpackPlugin=require('html-webpack-plugin');

var HTMLWebpackPluginConfig=new HTMLWebpackPlugin({
    template:__dirname+'/build/index.html',
    filename:'index.html',
    inject:'body'
});

module.exports={
    entry:__dirname+'/client/index.js',
    module:{
        loaders:[
            {
                test:/\.js?$/,
                exclude:/node_modules/,
                loader:'babel-loader',
                query:{
                    presets:['react','es2015']
                }
            }, {
                test: /\.css$/, // Only .css files
                loader: 'style-loader!css-loader' // Run both loaders
            }
        ]
    },
    output:{
        filename:'transformed.js',
        path:__dirname+'/build'
    },
    plugins:[HTMLWebpackPluginConfig]
};
