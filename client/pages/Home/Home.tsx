/*
 * @Author: hzsuqin 
 * @Date: 2018-05-27 09:36:54 
 * @Last Modified by: hzsuqin@corp.netease.com
 * @Last Modified time: 2018-05-27 09:37:14
 * @description: 测试用的home组件
 */

import * as React from 'react';

import { Link } from 'react-router-dom';

class Home extends React.Component {

    render () {
        return (
            <div className="home">
                home8
                <Link to="/unisdk/flagNameing">unisdk</Link>
            </div>
        );
    }
}

export default Home;
