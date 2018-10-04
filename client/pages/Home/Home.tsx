/*
 * @Author: hzsuqin 
 * @Date: 2018-05-27 09:36:54 
 * @Last Modified by: hzsuqin
 * @Last Modified time: 2018-10-04 10:35:57
 * @description: 测试用的home组件
 */

import * as React from 'react';

import { Link } from 'react-router-dom';

class Home extends React.Component {

    render () {
        return (
            <div className="home">
                <Link to="/docView/start">查看使用说明</Link>
            </div>
        );
    }
}

export default Home;
