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
        let openid: string = ''
        let oSessionId: string = ''
        if (ctx.query.isNotWeixin) {
            openid = 'h5openid' + ctx.helper.randomString() + (+new Date)
            oSessionId = 'h5sessionId' + ctx.helper.randomString() + (+new Date)
        } else {
            // 微信登陆
            const msg = await ctx.curl(`https://api.weixin.qq.com/sns/jscode2session?appid=${config.DACHUI_READER_APPID}&secret=${config.DACHUI_READER_SECRET}&js_code=${ctx.query.code}&grant_type=authorization_code`, { dataType: 'json' });
            if (msg.data.errcode) {
                // 微信出错
                ctx.status = 403;
                return;
            }
            openid = msg.data.openid
            oSessionId = msg.data.session_key
        }
        const { sessionId } = await ctx.model.ReaderUser.findOneAndUpdate({ openid }, {
            openid,
            sessionId: oSessionId
        }, { upsert: true, new: true })
        ctx.body = { sessionId };
    }
}
