/*
 * @Author: hzsuqin 
 * @Date: 2018-05-27 09:41:45 
 * @Last Modified by: hzsuqin
 * @Last Modified time: 2018-10-04 10:43:00
 * @description: redux action相关的utils
 */

import * as _ from 'lodash';
import axios from 'axios';
import { FETCH_FIRE, FETCH_SUCCESS, FETCH_FAILURE, PARAMS_METHOD } from 'Config';
import cookie from './cookie';

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
                headers: { 'x-csrf-token': cookie.get('csrfToken') },
                [_.includes(PARAMS_METHOD, method) ? 'params' : 'data']: data
            })
            .then(function (res) {
                let resData = res.data;
                // ajax请求成功action
                dispatch({ type, status: FETCH_SUCCESS, data: resData });
                return resData;
            })
            .catch(e => {
                console.log(e);
                dispatch({ type, status: FETCH_FAILURE });
                if (e.response && e.response.status === 401) {
                    // 401时重新登录 todo
                    return false;
                }
                if (e.response && e.response.status === 403) {
                    // 403无权限 todo
                    return false;
                }
                // 全局的错误处理 todo
                return false;
            });
    }
}
