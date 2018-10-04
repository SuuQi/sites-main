/*
 * @Author: hzsuqin 
 * @Date: 2018-05-27 17:17:10 
 * @Last Modified by: hzsuqin
 * @Last Modified time: 2018-10-04 10:52:48
 * @description: 前端主入口文件
 */

import * as React from 'react';
import { render } from 'react-dom';
import { BrowserRouter as Router } from 'react-router-dom';
import { createStore, applyMiddleware, combineReducers } from 'redux';
import { Provider } from 'react-redux';
import thunkMiddleware from 'redux-thunk';
import RouteWithSubRoutes from 'Components/Route';

import routes, { reducers } from './routes';

// 创建store并使用redux-thunk
const store = createStore( combineReducers(reducers), {}, applyMiddleware(thunkMiddleware) );

// 渲染页面
render(
    <Provider store={store}>
        <Router>
            {
                // 遍历路由配置创建视图
                routes.map((route, i) => <RouteWithSubRoutes key={i} {...route} />)
            }
        </Router>
    </Provider>,
    document.getElementById('app')
);
