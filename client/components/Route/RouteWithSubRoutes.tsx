/*
 * @Author: hzsuqin 
 * @Date: 2018-05-27 09:03:32 
 * @Last Modified by: hzsuqin
 * @Last Modified time: 2018-10-04 10:51:54
 * @description: 含有子路由的路由视图组件
 */

import * as React from 'react';
import { Route } from 'react-router-dom';

interface RouteProps {
    path: string,               // 路由地址
    component: any,             // 路由匹配组件
    exact?: boolean,            // 是否全匹配
    routes?: Array<RouteProps>  // 子路由数据
}

/**
 * 含有子路由的路由视图组件
 * 用于页面嵌套路由使用
 * @param {RouteProps} route 路由配置
 */
const RouteWithSubRoutes = (route: RouteProps) => (
    <Route
        exact={route.exact}
        path={route.path}
        render={props => (
            // 返回一个匹配路由，并传入子路由
            <route.component routeData={route} {...props} routes={route.routes} />
        )}
    />
);

export default RouteWithSubRoutes;
