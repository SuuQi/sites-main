const path = require('path');
const bs = require('browser-sync').create();
const webpackDevMiddleware = require('webpack-dev-middleware');
const stripAnsi = require('strip-ansi');
const webpack = require('webpack');

const webpackConfig = require('./webpack.config.base.ts');
const compiler = webpack(webpackConfig);
const definedPathReg = /^\/(api|assets|backend|auth)/;
const devMiddleware = webpackDevMiddleware(compiler, {
    publicPath: webpackConfig.output.publicPath,
    noInfo: false,
    stats: {
        colors: true,
        timings: true,
        chunks: false
    }
});

bs.init({
    logFileChanges: false,
    proxy: 'localhost:9000',
    online: false,
    serveStatic: [
        {
            route: '/assets',
            dir: path.join(__dirname, '../client/assets')
        }
    ],
    ws: true,
    middleware: [
        devMiddleware,
        (req, res, next) => {
            // 开发环境下，能够在未定义的路径下返回index.html
            devMiddleware.waitUntilValid(() => {
                try {
                    if (!definedPathReg.test(req.url)) {
                        const { getFilenameFromUrl } = devMiddleware;
                        const filename = getFilenameFromUrl('/index.html');
                        return res.end(devMiddleware.fileSystem.readFileSync(filename));
                    }
                } catch (e) {
                    console.log('middleware router error: ', e);
                }
                next();
            });
        }
    ],
    plugins: ['bs-fullscreen-message']
});

// 在webpack打包完成后，刷新所有设备
// 如果有错误，则发送错误
compiler.hooks.done.tap('webpack-compile-done', function (stats) {
    if (stats.hasErrors() || stats.hasWarnings()) {
        return bs.sockets.emit('fullscreen:message', {
            title: 'Webpack Error:',
            body: stripAnsi(stats.toString()),
            timeout: 100000
        });
    }

    console.log('reload browser');
    bs.reload();
});
