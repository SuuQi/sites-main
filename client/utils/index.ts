/*
 * @Author: hzsuqin 
 * @Date: 2018-10-04 10:46:23 
 * @Last Modified by:   hzsuqin 
 * @Last Modified time: 2018-10-04 10:46:23 
 * @description: utils出口文件
 */

import axios from 'axios';
export * from './actionUtils';
export * from './reducerUtils';

import cookie from './cookie';

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

/**
 * ajax下载文件
 * @export
 * @param {*} url 需要下载的文件url地址
 * @param {*} filename 可选，下载的文件名
 */
export function downloadFile (url, filename = 'unname') {
    axios.request({
        url,
        method: 'get',
        responseType: 'blob',
        headers: { 'x-csrf-token': cookie.get('csrfToken') }
    }).then(res => {
        const url = window.URL.createObjectURL(new Blob([res.data]));
        const link = document.createElement('a');
        link.href = url;
        link.setAttribute('download', filename);
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    }).catch(e => {
        console.log(e);
        alert('下载失败，请稍后再试，或联系管理员');
    });
}

export { cookie };

export * from '../../common/utils';
