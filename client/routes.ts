/*
 * @Author: hzsuqin 
 * @Date: 2018-05-27 17:21:23 
 * @Last Modified by: hzsuqin
 * @Last Modified time: 2018-10-04 11:04:06
 * @description: 路由配置文件
 */

import Home from './pages/Home';

/** 所有子页面的reducer */
export const reducers = {
}

/** 路由配置数组，支持一层嵌套。 */
export default [
    {
        path: '/',
        component: Home,
        exact: true,
        title: 'Home'
    },
    {
        path: '/home',
        component: Home,
        title: 'Home'
    }
];
