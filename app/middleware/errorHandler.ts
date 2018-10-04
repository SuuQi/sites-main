
import * as createError from 'http-errors';

export default () => async function errorHandler (ctx, next) {
    try {
        await next();

        const status = ctx.status || 404;

        if (status === 404) {
            throw new createError.NotFound();
        }
    } catch (err) {
        if (err instanceof createError.Unauthorized) {
            ctx.body = err.message;
            ctx.status = 401;
        } else if (err instanceof createError.Forbidden) {
            ctx.body = err.message;
            ctx.status = 403;
        } else if (err instanceof createError.NotFound
            && ctx.request.header['x-requested-with'] !== 'XMLHttpRequest'
            && ctx.url.indexOf('/socket.io-client') < 0
            && ctx.url.indexOf('/public/') < 0
            && ctx.url.indexOf('/backend/') < 0
            && ctx.url.indexOf('/api') < 0) {
            // 404也交由前端实现
            // 其他路由都返回首页
            // 为防止出现错误日志，直接退出函数
            await ctx.render('index.ejs');
            return;
        } else {
            ctx.body = err.message || err.stack
                ? `${err.message}\n${err.stack}`
                : err;
            ctx.status = err.status || 500;
        }

        ctx.app.emit('error', err, ctx);
    }
};
