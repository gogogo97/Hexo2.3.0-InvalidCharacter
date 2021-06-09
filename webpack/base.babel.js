/**
 * Created by atthakorn on 3/1/2017.
 */


import path from 'path'
import MiniCssExtractPlugin from 'mini-css-extract-plugin'
import CleanWebpackPlugin from 'clean-webpack-plugin'
import CopyWebpackPlugin from 'copy-webpack-plugin'

export default function (env) {

    return {
        context: path.resolve(__dirname, '../'),


        entry: {
            'vendor': './themes/default/assets/vendor',
            'theme': './themes/default/assets/theme',
            'email': './themes/default/assets/email',
            'cookie': './themes/default/assets/cookie'
        },

        output: {

            filename: '[name].js',
            path: path.resolve(__dirname, '../public/assets'),
            sourceMapFilename: '[file].map',

        },

        resolve: {
            extensions: ['.js', '.css', '.scss'],

        },


        module: {
            rules: [

                {
                    test: /\.js$/,
                    include: /assets/,
                    exclude: /assets\/vendor\//,
                    use: 'babel-loader' //use babel loader to preserve sourcemap
                },
                {
                    test: /\.js$/,
                    include: /assets\/vendor\//,
                    use: 'script-loader', //execute vendor globally
                },

                {
                    test: /\.(css|scss)/,
                    use: [
                        MiniCssExtractPlugin.loader,
                        'css-loader',
                        'sass-loader'
                    ]
                },
                {
                    test: /\.(eot|ttf|woff|woff2)$/,
                    use: "file-loader?name=fonts/[name].[ext]"
                },
                {
                    test: /\.(svg|png|jpg|gif)$/,
                    use: "file-loader?name=images/[name].[ext]"
                }
            ]
        },


        plugins: [


            new MiniCssExtractPlugin('[name].css'),
            new CleanWebpackPlugin(['assets'], {
                root: path.resolve(__dirname, '../public'),
            }),
            new CopyWebpackPlugin([{
                context: 'themes/default/assets',
                from: '@(images)/**/*',
                to: 'static'
            },
                {
                    context: 'themes/default/assets',
                    from: '@(files)/**/*',
                    to: 'static'
                },
            ]),

        ],
    }
}