/*
 * @Author: hzsuqin 
 * @Date: 2018-07-07 10:48:10 
 * @Last Modified by: hzsuqin@corp.netease.com
 * @Last Modified time: 2018-07-07 10:48:34
 * @description: 前端工具集合入口文件
 */

export * from './actionUtils';
export * from './reducerUtils';

/**
 * 传入相对路径获取绝对地址
 * @export
 * @param {string} url 相对路径
 * @returns {String} 绝对地址
 */
export function getAbsoluteUrl(url: string) {
    const a = document.createElement('a');
    a.href = url;
    return a.href;
}

