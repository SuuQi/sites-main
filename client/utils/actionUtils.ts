/*
 * @Author: hzsuqin 
 * @Date: 2018-07-07 09:41:45 
 * @Last Modified by: hzsuqin@corp.netease.com
 * @Last Modified time: 2018-07-07 20:14:38
 * @description: redux action相关的utils
 */

import * as _ from 'lodash';
import axios from 'axios';
import { FETCH_FIRE, FETCH_SUCCESS, FETCH_FAILURE, PARAMS_METHOD } from 'Config';

/**
 * 异步ajax请求的action生成参数
 * @interface AjaxData
 */
interface AjaxData {
    url: string,
    type: any, // 请求生成的action type
    method?: string,
    data?: any
}

/**
 * 生成异步ajax请求的action，通过redux-thunk中间件解析
 * 并做了一些通用的错误处理
 * @export
 * @param {AjaxData} { url, method = 'get', type, data = {} } 
 * @returns {Function} 异步ajax请求的action
 */
export function fetchAjax ({ url, method = 'get', type, data = {} }: AjaxData) {
    // 返回函数执行后返回ajax操作的promise，以返回值标识成功请求的的数据或者失败
    return function (dispatch) {
        // 触发一次开始ajax的action
        dispatch({ type, status: FETCH_FIRE });
        // 发送ajax请求
        return axios.request({
                url,
                method,
                [_.includes(PARAMS_METHOD, method) ? 'params' : 'data']: data
            })
            .then(function (msg) {
                let resData = msg.data;
                if (msg.status === 204) {
                    // 204时，把数据穿透给action
                    resData = data || {};
                } else {
                    resData = resData || {};
                }
                // ajax请求成功action
                dispatch({ type, status: FETCH_SUCCESS, data: resData });
                return resData;
            })
            .catch(e => {
                console.log(e);
                dispatch({ type, status: FETCH_FAILURE });
                if (e.response && e.response.status === 401) {
                    // 401时重新登录
                    // redirectToLogin();
                    return false;
                }
                // 全局的错误处理
                // dispatch(RootActons.showNotification('错误：服务器返回了错误 ' + e.message));
                return false;
            });
    }
}
