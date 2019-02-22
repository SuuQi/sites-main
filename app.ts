/*
 * @Author: hzsuqin 
 * @Date: 2018-10-04 10:27:14 
 * @Last Modified by: hzsuqin
 * @Last Modified time: 2018-10-04 10:28:11
 * @description: 服务端入口，处理egg额外操作
 */

import { EggApplication } from 'egg';
import * as proxy from 'koa-proxy';

export default (app: EggApplication) => {
    app.beforeStart(() => {
        /** 代理追书接口 */
        app.use(proxy({
            host: 'http://api.zhuishushenqi.com',
            match: /^\/api\/book-api\//,
            jar: true,
            map: (path: string) => path.replace(/^\/api\/book-api/, '')
        }));
        app.use(proxy({
            host: 'http://statics.zhuishushenqi.com',
            match: /^\/api\/book-statics\//,
            jar: true,
            map: (path: string) => path.replace(/^\/api\/book-statics/, '')
        }));
        app.use(proxy({
            host: 'http://chapter2.zhuishushenqi.com',
            match: /^\/api\/book-chapter2\//,
            jar: true,
            map: (path: string) => path.replace(/^\/api\/book-chapter2/, '')
        }));
    })
};
