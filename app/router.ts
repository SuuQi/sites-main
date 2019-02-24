import { Application } from 'egg';
import { initRouter } from 'egg-router-decorator';

export default (app: Application) => {
    const { router } = app;

    // 主页面，非/api开头
    router.get(/^(?!\/api).+$/, async (ctx) => {
        await ctx.render('index.ejs');
    });

    /** 代理接口 */
    router.get(/\/api\/book-api\/.*/, async (ctx, next) => {
        await next();
        ctx.body = await ctx.curl('http://api.zhuishushenqi.com' + ctx.request.url.replace(/^\/api\/book-api/, ''), { dataType: 'json' });
        ctx.body = ctx.body.data;
    });
    /** 代理章节 */
    router.get(/\/api\/book-chapter2\/.*/, async (ctx, next) => {
        await next();
        ctx.body = await ctx.curl('http://chapter2.zhuishushenqi.com' + ctx.request.url.replace(/^\/api\/book-chapter2/, ''), { dataType: 'json' });
        ctx.body = ctx.body.data;
    });
    /** 代理静态资源 */
    router.get(/\/api\/book-statics\/.*/, async (ctx, next) => {
        await next();
        ctx.body = await ctx.curl('http://statics.zhuishushenqi.com' + ctx.request.url.replace(/^\/api\/book-statics/, ''));
        ctx.body = ctx.body.data;
    });

    initRouter(app, { prefix: '/api' });
};
