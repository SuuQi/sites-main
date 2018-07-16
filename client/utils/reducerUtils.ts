/*
 * @Author: hzsuqin 
 * @Date: 2018-05-27 09:54:24 
 * @Last Modified by: hzsuqin
 * @Last Modified time: 2018-06-25 16:51:37
 * @description: redux reducer相关的utils
 */

import * as _ from 'lodash';
import { FETCH_FIRE, FETCH_SUCCESS, FETCH_FAILURE } from 'Config';

/**
 * 生成reducer函数
 * @export
 * @param {any} initState 初始state
 * @param {any} handlers 处理各个type的函数集合，以键值对形式表示。键：action的type，值：reducer纯函数
 * @returns 整合好的reducer
 */
export function createReducer (initState, handlers) {
    return function (state = initState, action) {
        if (handlers.hasOwnProperty(action.type)) {
            return handlers[action.type](state, action);
        }
        return state;
    }
}

/**
 * 生成处理异步操作的reducer
 * 并设置成功异步操作时的处理函数
 * @export
 * @param {Function} handleSuccess 成功异步操作时的处理函数
 * @returns {Function} 处理异步操作的reducer
 */
export function fetchHandle (handleSuccess: Function) {
    return function (state, action) {
        switch (action.status) {
        case FETCH_FIRE:
            return { ...state, isFetching: true };
        case FETCH_SUCCESS:
            return handleSuccess(state, action);
        case FETCH_FAILURE:
            return { ...state, isFetching: false };
        default:
            return { ...state };
        }
    }
}

/**
 * 默认的公用的reducer方法
 * 将action的data都转换到state中，{ ...state, ...action.data }
 * @export
 * @param {any} state 
 * @param {any} action 
 * @returns {Object} newState
 */
export function defaultSuccess (state, action) {
    return { ...state, isFetching: false, ...action.data };
}

/**
 * 默认的公用的reducer方法，不插入数据
 * @export
 * @param {any} state 
 * @param {any} action 
 * @returns {Object} newState
 */
export function defaultSuccessNoData (state, action) {
    return { ...state, isFetching: false };
}

/**
 * 默认的公用的reducer方法生成器
 * 将action的data都转换到state指定的key中， { ...state, [stateKey]: { ...action.data } }
 * @export
 * @param {string} stateKey 指定的key
 * @returns {Object} newState
 */
export function defaultSuccessByKey (stateKey: string) {
    return function (state, action) {
        return { ...state, isFetching: false, [stateKey]: _.clone(action.data) };
    }
}
