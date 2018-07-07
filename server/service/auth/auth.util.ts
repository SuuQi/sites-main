/*
 * @Author: hzsuqin 
 * @Date: 2018-05-28 15:04:58 
 * @Last Modified by: hzsuqin@corp.netease.com
 * @Last Modified time: 2018-06-29 15:55:24
 * @description: 权限相关控制的service util方法集合
 */

import { isLogin, hasAuth } from '@pangu/openid-auth-backend';
import * as config from './auth.config';

/** 判断是否登录中间件 */
export const hasLogin = isLogin();

/** 判断是否有服务端查询权限 */
export const hasAuthQuery = hasAuth(config.SERVER.SAVE);

/** 判断是否有服务端保存权限 */
export const hasAuthSave = hasAuth(config.SERVER.SAVE);

/** 判断是否有服务端下载表单相关权限 */
export const hasAuthDownload = hasAuth(config.SERVER.DOWNLOAD);

/** 判断是否有服务端更新权限 */
export const hasAuthDelete = hasAuth(config.SERVER.DELETE);
