/*
 * @Author: hzsuqin 
 * @Date: 2018-05-28 19:44:53 
 * @Last Modified by: hzsuqin@corp.netease.com
 * @Last Modified time: 2018-06-30 17:59:29
 * @description: prox代理服务主文件
 */

import URL from 'url';
import request from 'request';
import _ from 'lodash';

import Config from '../../config';
import { JSONBigInt } from '../../utils';

/** request请求默认配置 */
const DEFAULT_OPTS = {
    gzip: true,
    timeout: 30000
};

// 参考： https://github.com/xiongwilee/koa-grace/blob/master/middleware/proxy/lib/request.js
/**
 * 向其他服务器发起请求
 * @param {Object} opts 请求的配置，详细请见：https://github.com/request/request
 * @param {string} opts.target 代理源
 * @param {string} opts.url 代理地址
 * @param {Boolean} opts.hasBigInt 是否含有大数字
 * @param {Boolean} opts.data 代理请求数据，默认取客户端请求的相应data
 * @param {Boolean} opts.method 代理请求方法，默认ctx.request.method
 * @return {Promise} 返回promise
 */
function proxy (opts, ctx = this) {
    const startTime = +new Date();
    const method = opts.method || ctx.request.method;

    /** 进行parse和stringify的工具实例 */
    const JSON_UTIL = opts.hasBigInt ? JSONBigInt : JSON;

    /** 代理请求uid */
    const opUid = (+new Date()).toString();

    /** 传入的数据类型是不是qs */
    const isQsData = _.includes(Config.PARAMS_METHOD, method);

    /** 代理数据data */;
    opts.data && (opts.data.opUid = opUid) && !isQsData && (opts.data = JSON_UTIL.stringify(opts.data));
    let reqData = opts.data || (isQsData ? { opUid, ...ctx.query } : JSON_UTIL.stringify({ opUid, ...ctx.request.fields }));

    /** request配置 */
    const options = {
        url: opts.url,
        baseUrl: opts.target,
        headers: {
            'Content-Type': 'application/json',
            // Cookie: ctx.headers.cookie
        },
        [isQsData ? 'qs': 'body']: reqData,
        method,
        ...DEFAULT_OPTS
    };

    // console.log(options);

    return new Promise((resolve, reject) => {
        const proxyRequest = request(options, (err, res: any, data) => {
            /** 代理请求总耗时 */
            const duration = `${+new Date() - startTime}ms`;

            // 请求失败处理
            if (err) {
                err = err || {};
                err.status = res && res.status ? res.status : 500;
                err.duration = duration;
                console.error(err);
                reject(`proxy error: ${options.url}`);
                return;
            }

            if (data || ctx.method === 'HEAD') {
                try {
                    // json化成功的数据
                    data = JSON_UTIL.parse(data);
                } catch (e) {}
                
                if (data.errorCode !== 0) {
                    // 代理服务器返回状态码成功时，直接resolve成功的data
                    resolve(data);
                } else {
                    // 代理服务器返回状态码失败时，resolve请求的errorCode和errorMessage
                    resolve(data.payload);
                    console.log(data);
                }
                return;
            }
        });

        // 相关详见request库
        if (ctx.req.readable && ctx.method !== 'GET') {
            ctx.req.pipe(proxyRequest);
        }
        if (opts.needPipeRes) {
            proxyRequest.pipe(ctx.res);
        }
    });
}

/** 初始化代理服务，输入默认的代理参数 */
export default function (options = {}) {
    /**
     * 代理服务端接口
     * 传入url或者proxy option对象
     */
    return function (_options) {
        if (typeof _options === 'string') {
            _options = { url: _options };
        }
        return proxy.call(this, Object.assign({}, options, _options));
    }
}
