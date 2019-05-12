import { Application } from 'egg';
import { initRouter } from 'egg-router-decorator';

export default (app: Application) => {
    const { router } = app;

    // 主页面，非/api开头
    router.get(/^(?!\/api).+$/, async (ctx) => {
        await ctx.render('index.ejs');
    });

    /** reader代理接口 */
    router.get(/\/api\/book-api\/.*/, async (ctx, next) => {
        await next();
        ctx.body = await ctx.curl('http://api.zhuishushenqi.com' + ctx.request.url.replace(/^\/api\/book-api/, ''), { dataType: 'json', gzip: true });
        ctx.body = ctx.body.data;
    });
    /** reader代理章节 */
    router.get(/\/api\/book-chapter2\/.*/, async (ctx, next) => {
        await next();
        ctx.body = await ctx.curl('http://chapter2.zhuishushenqi.com' + ctx.request.url.replace(/^\/api\/book-chapter2/, ''), { dataType: 'json', gzip: true });
        ctx.body = ctx.body.data;
    });
    /** reader代理静态资源 */
    router.get(/\/api\/book-statics\/.*/, async (ctx, next) => {
        await next();
        ctx.body = await ctx.curl('http://statics.zhuishushenqi.com' + ctx.request.url.replace(/^\/api\/book-statics/, ''), { gzip: true });
        ctx.body = ctx.body.data;
    });

    initRouter(app, { prefix: '/api' });
};
