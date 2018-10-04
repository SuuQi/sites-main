/*
 * @Author: hzsuqin 
 * @Date: 2018-10-04 10:15:42 
 * @Last Modified by: hzsuqin
 * @Last Modified time: 2018-10-04 11:05:29
 */

import { Controller } from 'egg';
import { bp } from 'egg-router-decorator';

bp.prefix('/hello', 'HelloController')
export default class HelloController extends Controller {

    /**
     * hello index接口
     * @memberof HelloController
     */
    @bp.get('/')
    public async index () {
        const { ctx } = this;
        ctx.body = 'hello';
    }
}
