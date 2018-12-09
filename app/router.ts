import { Application } from 'egg';
import { initRouter } from 'egg-router-decorator';

export default (app: Application) => {
    const { router } = app;

    // 主页面，非/api开头
    router.get(/^(?!\/api).+$/, async (ctx) => {
        await ctx.render('index.ejs');
    });

    initRouter(app, { prefix: '/api' });
};
