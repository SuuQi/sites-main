/*
 * @Author: hzsuqin 
 * @Date: 2018-07-07 09:31:08 
 * @Last Modified by: hzsuqin
 * @Last Modified time: 2018-07-07 15:06:16
 * @description: 前端全局配置文件
 */

/** 导出所有前后端公共配置 */
export * from '../../common/config';

/** action的status值，标识async请求开始 */
export const FETCH_FIRE = Symbol('FETCH_FIRE');

/** action的status值，标识async请求成功 */
export const FETCH_SUCCESS = Symbol('FETCH_SUCCESS');

/** action的status值，标识async请求失败 */
export const FETCH_FAILURE = Symbol('FETCH_FAILURE');
