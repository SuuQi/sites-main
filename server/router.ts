/*
 * @Author: hzsuqin 
 * @Date: 2018-05-28 15:03:41 
 * @Last Modified by: hzsuqin@corp.netease.com
 * @Last Modified time: 2018-06-24 18:51:01
 * @description: 服务端路由入口文件
 */

import Router from 'koa-router';
import * as AUTH from './service/auth';
import { serverMap } from './service/proxy';
import unisdk from './api/unisdk';
import settings from './api/settings';
import code from './api/code';

/** 汇总的路由 */
const router = new Router();

// unisdk模块路由
router.use('/api/unisdklogin', unisdk.routes(), unisdk.allowedMethods());

// 设置模块路由
router.use('/api/settings', settings.routes(), settings.allowedMethods());

// 设置模块路由
router.use('/api/code', code.routes(), code.allowedMethods());

// 用户信息接口
router.get('/api/me', AUTH.hasLogin, async function (ctx) {
    ctx.body = ctx.state.user;
});

router.get('/api/proxyList', async function (ctx) {
    ctx.body = serverMap;
});

export default router;
