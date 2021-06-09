import webpackMerge from 'webpack-merge'
import base from './base.babel'

import HexoRenderPlugin from './plugins/HexoRenderPlugin'

export default function (env) {
    return webpackMerge(base(), {

        mode: 'development',
        devtool: 'source-map',

        plugins: [
            new HexoRenderPlugin({
                path: './themes/default/@(layout|views)/**/*',
                watch: true,
                delay: 500,
            }),
        ]
    });
}
