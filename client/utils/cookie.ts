/*
 * @Author: hzsuqin 
 * @Date: 2018-10-04 10:45:53 
 * @Last Modified by:   hzsuqin 
 * @Last Modified time: 2018-10-04 10:45:53 
 * @description: cookie操作工具方法
 */

const ONE_HOUR = 60 * 60 * 1000;

const cookie = {
    /**
    * 获取置顶名称的cookie值
    * @param  {String} name cookie键名
    * @return {type}        cookie键值
    */
    get (name) {
        const reg = new RegExp('(?:^|;{1}|\\s{1})' +  encodeURIComponent(name) + '=([^;]*)');
        let value = document.cookie.match(reg);
        return value ? decodeURIComponent(value[1]) : null;
    },

    /**
    * 设置一个cookie
    * @param {String} name   cookie键名
    * @param {String} value  cookie键值
    * @param {String} domain 设置所在域名
    * @param {String} path   设置所在路径
    * @param {Number} hour   存活时间，单位:小时
    * @return {Boolean}      cookie操作的单例
    */
    set (name, value, domain = location.host, path = '/', hour = .5) {
        const expires = new Date(+new Date() + ONE_HOUR * hour).toUTCString();
        document.cookie = `${name}=${value}; expires=${expires}; path=${path}; domain=${domain};`;
        return cookie;
    },
    
    /**
    * 删除一个cookie
    * @param {String} name   cookie键名
    * @param {String} domain 设置所在域名
    * @param {String} path   设置所在路径
    * @return {Boolean}      cookie操作的单例
    */
    remove: function (name, domain = location.host, path = '/') {
        return cookie.set(name, '', domain, path, -1);
    }
};

export default cookie;
