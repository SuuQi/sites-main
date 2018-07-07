/*
 * @Author: hzsuqin 
 * @Date: 2018-05-28 15:03:19 
 * @Last Modified by:   hzsuqin@corp.netease.com 
 * @Last Modified time: 2018-05-28 15:03:19
 * @description: 服务端入口文件 
 */

import config from './config';
import app from './app';

const server = require('http').createServer(app.callback());

// 启动服务器
server.listen(config.PORT, err => {
    if (err) {
        console.error(`服务器启动失败，在 ${config.PORT} 端口`);
        process.exit();
        return;
    }
    console.log(`服务器启动在 ${config.PORT} 端口`);
});

// 防止在命令行中无法退出
process.on('SIGINT', function () {
    process.exit();
});
