/*
 * @Author: hzsuqin 
 * @Date: 2018-05-28 16:12:10 
 * @Last Modified by: hzsuqin@corp.netease.com
 * @Last Modified time: 2018-06-29 15:55:06
 * @description: auth服务的config文件，配置具体权限具体权限种类
 */

import { isLogin, hasAuth, PASS_KEY, REFUSE_KEY } from '@pangu/openid-auth-backend';

/** 服务器权限map */
export const SERVER = {
    QUERY: 'server.query',
    SAVE: 'server.save',
    DOWNLOAD: 'server.download',
    DELETE: 'server.delete'
};

/** 服务器权限list */
export const AUTH_LIST = [
    {
        mark: SERVER.QUERY,
        index: 1,
        name: '服务器-查询'
    },
    {
        mark: SERVER.SAVE,
        index: 2,
        name: '服务器-添加'
    },
    {
        mark: SERVER.DOWNLOAD,
        index: 3,
        name: '服务器-下载'
    },
    {
        mark: SERVER.DELETE,
        index: 4,
        name: '服务器-更新'
    }
];


/** 默认全局角色配置 */
export const ROLE_CONFIG = {
    globalAdmin: {
        name: '管理员',
        keys: {
            'user.updateRoles': PASS_KEY,
            'role.query': PASS_KEY,
            'role.save': PASS_KEY,
            'role.update': PASS_KEY,
            'role.remove': PASS_KEY,
            [SERVER.QUERY]: PASS_KEY,
            [SERVER.SAVE]: PASS_KEY,
            [SERVER.DOWNLOAD]: PASS_KEY,
            [SERVER.DELETE]: PASS_KEY
        }
    },
    globalUser: {
        name: '用户',
        keys: {
            'user.updateRoles': REFUSE_KEY,
            'role.query': REFUSE_KEY,
            'role.save': REFUSE_KEY,
            'role.update': REFUSE_KEY,
            'role.remove': REFUSE_KEY,
            [SERVER.QUERY]: PASS_KEY,
            [SERVER.SAVE]: PASS_KEY,
            [SERVER.DOWNLOAD]: REFUSE_KEY,
            [SERVER.DELETE]: REFUSE_KEY
        }
    },
    globalGuest: {
        name: '访客',
        keys: {
            'user.updateRoles': REFUSE_KEY,
            'role.query': REFUSE_KEY,
            'role.save': REFUSE_KEY,
            'role.update': REFUSE_KEY,
            'role.remove': REFUSE_KEY,
            [SERVER.QUERY]: PASS_KEY,
            [SERVER.SAVE]: REFUSE_KEY,
            [SERVER.DOWNLOAD]: REFUSE_KEY,
            [SERVER.DELETE]: REFUSE_KEY
        }
    }
}
