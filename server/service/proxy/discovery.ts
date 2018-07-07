/*
 * @Author: hzsuqin 
 * @Date: 2018-05-28 16:02:38 
 * @Last Modified by: hzsuqin@corp.netease.com
 * @Last Modified time: 2018-05-28 17:09:44
 * @description: 服务发现，轮询获取服务list
 */

import config from '../../config';
import request from 'request';

/** 服务发现地址接口 */
const discoveryUrl = config.SERVER_HOST + '/registry/eureka/apps';

/** 服务发现接口轮询间隔时间 */
const discoveryInterval = 30000;

let discoverTid;

/** 服务发现结果储存对象 */
let serverMap = { list: {}, root: config.SERVER_HOST };

/** 发送服务发现请求 */
function discoveryRequest () {
    return new Promise((resolve, reject) => {
        request({
            url: discoveryUrl,
            json: true
        }, function (err, response, body) {
            if (err) {
                console.error(`service discovery request error: ${discoveryUrl}`);
                console.error(err);
                resolve();
                return;
            }
            serverMap.list = body.applications.application;
            resolve();
        })
    })
}

/** 服务发现轮询方法 */
function loop () {
    discoverTid = setTimeout(function () {
        discoveryRequest().then(loop);
    }, discoveryInterval);
}

// 开启服务发现
discoveryRequest().then(loop);

export default serverMap;
