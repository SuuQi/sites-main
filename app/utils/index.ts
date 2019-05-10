
/**
 * 检查reader是否登录的中间件
 * @export
 * @param {*} ctx
 * @param {*} next
 */
export async function checkReaderUserMiddleWare (ctx, next) {
    const sessionId = ctx.headers['x-reader-session'];
    if (!sessionId) {
        ctx.status = 401;
    } else {
        ctx.state.user = await ctx.model.ReaderUser.findOne({ sessionId }).exec();
        if (!ctx.state.user) {
            ctx.status = 401;
        } else {
            await next();
        }
    }
}
