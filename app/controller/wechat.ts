import { Controller } from 'egg';
import routerDecorator from 'egg-router-decorator';

@routerDecorator.prefix('/wechat')
export default class WechatController extends Controller {

    /**
     * 大锤阅读器登录接口
     * @memberof WechatController
     */
    @routerDecorator.get('/dachui/login')
    public async dachuiReaderLogin () {
        const { ctx, config } = this;
        const msg = await ctx.curl(`https://api.weixin.qq.com/sns/jscode2session?appid=${config.DACHUI_READER_APPID}&secret=${config.DACHUI_READER_SECRET}&js_code=${ctx.query.code}&grant_type=authorization_code`, { dataType: 'json' });
        ctx.body = msg.data;
    }
}
