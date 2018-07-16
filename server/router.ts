/*
 * @Author: hzsuqin 
 * @Date: 2018-05-28 15:03:41 
 * @Last Modified by: hzsuqin
 * @Last Modified time: 2018-06-24 18:51:01
 * @description: 服务端路由入口文件
 */

import Router from 'koa-router';

/** 汇总的路由 */
const router = new Router();


router.get('/api/test', async function (ctx) {
    ctx.body = {
        test: true
    };
});

export default router;
