/*
 * @Author: hzsuqin 
 * @Date: 2018-05-28 16:30:43 
 * @Last Modified by: hzsuqin@corp.netease.com
 * @Last Modified time: 2018-05-28 17:25:27
 * @description: 服务端config配置入口文件
 */

import * as Const from './const';

export default Object.assign({}, Const, process.env);
