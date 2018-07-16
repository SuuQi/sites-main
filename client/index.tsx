/*
 * @Author: hzsuqin 
 * @Date: 2018-07-07 17:17:10 
 * @Last Modified by: hzsuqin
 * @Last Modified time: 2018-07-07 10:53:00
 * @description: 前端主入口文件
 */

import * as React from 'react';
import { render } from 'react-dom';

import Home from 'Pages/Home';

// 渲染页面
render(
    <Home />,
    document.getElementById('app')
);
