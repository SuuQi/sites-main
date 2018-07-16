/*
 * @Author: hzsuqin 
 * @Date: 2018-05-28 14:58:40 
 * @Last Modified by: hzsuqin
 * @Last Modified time: 2018-05-28 17:19:19
 * @description app实例初始化文件
 */

import path from 'path';
import Koa from 'koa';
import mongoose from 'mongoose';
import config from './config';

/** koa实例 */
const app = new Koa();

// 设置mongoose使用的promise 连接数据库
mongoose.Promise = Promise;
mongoose.connect(config.MONGODB_URI, {});
mongoose.connection.on('error', () => console.error('数据库连接错误。'));

// 调用一些中间件
app.use(require('koa-logger')());
app.use(require('koa-compress')());
app.use(require('koa-better-body')({
    querystring: require('qs'),
    hash: 'md5',
    keepExtensions: true
}));
app.use(require('koa-static')(path.join(config.ROOT, 'client'), {
    maxage: 1000 * 60 * 10
}));

// 添加路由和错误处理
const router = require('./router').default;
const { errorHandler, errorLog } = require('./service/error');

app.use(errorHandler);
app.use(router.routes());
app.use(router.allowedMethods());

app.on('error', (err, ctx) => {
    errorLog('server error', err, ctx);
});

// 抛出错误堆栈
process.on('unhandledRejection', r => console.error(`unhandledRejection：${r} ${r.stack}`));
process.on('uncaughtException', r => console.error(`uncaughtException：${r} ${r.stack}`));

export default app;
