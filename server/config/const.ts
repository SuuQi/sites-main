/*
 * @Author: hzsuqin 
 * @Date: 2018-05-28 16:31:25 
 * @Last Modified by: hzsuqin
 * @Last Modified time: 2018-06-29 10:57:41
 * @description: 服务端config的一些const
 */

import path from 'path';
export * from '../../common/config';

/**
 * 项目根目录
 */
export const ROOT = path.join(__dirname, '../../');

// 默认的数据库
export const MONGODB_URI = 'mongodb://localhost/sites-main-dev';

// 默认的服务器监听端口
export const PORT = 9000;

// export const SERVER_HOST = 'http://10.241.0.91:62553/';

