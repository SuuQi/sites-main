
export async function checkUserMiddle (ctx, next) {
    const sessionId = ctx.headers['x-reader-session'];
    console.log(ctx.headers);
    if (!sessionId) {
        ctx.status = 401;
    } else {
        ctx.state.user = await ctx.model.ReaderUser.findOne({ sessionId }).exec();
        await next();
    }
}
