
import webpackMerge from 'webpack-merge'
import base from './base.babel'
import HexoRenderPlugin from './plugins/HexoRenderPlugin'
import OptimizeCssAssetsPlugin from 'optimize-css-assets-webpack-plugin'

export default function (env) {

    return webpackMerge(base(), {

        mode: 'production',
        devtool: 'cheap-module-source-map',


        plugins: [



            new HexoRenderPlugin({
                path: './themes/default/@(layout|views)/**/*',
                watch: false,
                delay: 1500,
            }),
            new OptimizeCssAssetsPlugin({
                assetNameRegExp: /(\.css)$/g,
                cssProcessor: require('cssnano'),
                canPrint: true
            }),
        ],
    })
}


