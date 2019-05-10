
export async function checkUserMiddleWare (ctx, next) {
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
