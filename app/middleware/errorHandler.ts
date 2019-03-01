
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
        } else if (err instanceof createError.NotFound) {
            ctx.body = err.message;
            ctx.status = 404;
        } else {
            ctx.body = err.message || err.stack
                ? `${err.message}\n${err.stack}`
                : err;
            ctx.status = err.status || 500;
        }
        console.error(err);
        ctx.app.emit('error', err, ctx);
    }
};
