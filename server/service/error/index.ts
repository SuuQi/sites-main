/*
 * @Author: hzsuqin 
 * @Date: 2018-05-28 14:57:35 
 * @Last Modified by: hzsuqin@corp.netease.com
 * @Last Modified time: 2018-05-28 20:43:22
 * @description: error中间件集合文件
 */

import fs from 'fs';
import _ from 'lodash';
import createError from 'http-errors';
import config from '../../config';

/**
 * 错误日志打印方法
 * @auther hzwangxinliang
 * @param  {String}                 prefix 日志前缀
 * @param  {Error}                 err    错误对象
 * @param {Object} ctx 路由上下文
 */
export function errorLog (prefix, err, ctx) {
    if (err instanceof createError.Unauthorized) {
        console.error(`${prefix} 401 ${ctx.request.url}`);
    } else {
        console.error(`${prefix} ${err} ${err.stack}`);
    }
}

/**
 * 错误处理中间件
 * 根据不同的错误码返回错误
 * @param  {Object}   ctx 路由上下文
 * @param  {Function} next next函数
 */
export async function errorHandler (ctx, next) {
    try {
        await next();

        const status = ctx.status || 404;

        if (status === 404) {
            throw new createError.NotFound();
        }
    } catch (err) {
        if (err instanceof createError.Unauthorized) {
            ctx.body = err.message;
            ctx.status = 401;
        } else if (err instanceof createError.Forbidden) {
            ctx.body = err.message;
            ctx.status = 403;
        } else if (err instanceof createError.NotFound
            && ctx.request.header['x-requested-with'] !== 'XMLHttpRequest'
            && ctx.url.indexOf('/socket.io-client') < 0) {
            // 404也交由前端实现
            // 其他路由都返回首页
            // 为防止出现错误日志，直接退出函数
            ctx.body = await staticFile(`${config.ROOT}/client/index.html`);
            return;
        } else {
            ctx.body = err.message || err.stack
                ? `${err.message}\n${err.stack}`
                : err;
            ctx.status = err.status || 500;
        }

        ctx.app.emit('error', err, ctx);
    }
}

/** 返回静态文件 */
function staticFile (src) {
    return new Promise((resolve, reject) => {
        fs.readFile(src, { encoding: 'utf8' }, (err, data) => {
            if (err) return reject(err);
            resolve(data);
        });
    });
}
