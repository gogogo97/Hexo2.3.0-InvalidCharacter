import chokidar from 'chokidar'
import BrowserSync from 'browser-sync'
import Hexo from 'hexo'
import _ from 'lodash'


export default class HexoRenderPlugin {

    constructor(options) {

        //hexo
        this.hexo = new Hexo(process.cwd(), {debug: false});
        this.hexo.init();
        this.hexo.call('clean', {});


        //generator
        this.generator = null;
        this.canRefresh = false;

        //watch & refresh
        this.isWatch = options.watch || false;
        if (this.isWatch) {
            this.watchPath = options.path || './themes/default/@(layout|views)/**/*';

            this.createBrowserSync();
            this.createWatcher();
        }

        this.delay = options.delay || 500;
    }

    createBrowserSync() {
        this.browserSync = BrowserSync.create();
        this.browserSync.init({
            reloadDebounce: 300
        });

    }

    createWatcher() {

        let plugin = this;

        this.watcher = chokidar.watch(this.watchPath, {
            usePolling: true,
            interval: 200,
            binaryInterval: 300,
        });

        this.watcher.on('all', (event, path) => {
            //    console.log(event, path)

            if (event === 'add'
                || event === 'addDir'
                || event === 'unlink'
                || event === 'unlinkDir'
                || event === 'change') {

                plugin.generate(plugin.canRefresh);
            }
        });
    }

    notifyBrowser() {
        if (this.isWatch && this.canRefresh) {
            this.browserSync.notify('Rebuilding...');
        }
    }

    refreshBrowser() {
        if (this.isWatch && this.canRefresh) {
            this.browserSync.reload();
        }
    }

    makeGenerator(refresh = false) {

        let plugin = this;
        return _.debounce(function (refresh) {

            plugin.notifyBrowser();

            plugin.hexo.call('generate', {}).then(function () {

                if (refresh)
                    plugin.refreshBrowser();

            });

        }, this.delay);
    }

    generate(refresh = false) {
        if (!this.generator) {
            this.generator = this.makeGenerator(refresh);
        }

        this.generator(refresh);
    }


    apply(compiler) {

        let plugin = this;

        compiler.plugin('compilation', function () {
            plugin.notifyBrowser();
        });


        compiler.plugin('run', function (compilation, callback) {
            plugin.generate();

            callback();

        });


        compiler.plugin('done', function (stats) {

            plugin.canRefresh = true;

            plugin.refreshBrowser();
        });


    }
}