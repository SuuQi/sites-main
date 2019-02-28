import { Controller } from 'egg';
import routerDecorator from 'egg-router-decorator';
import { checkUserMiddle } from '../utils';

/**
 * 大锤阅读器相关接口
 */
@routerDecorator.prefix('/reader', checkUserMiddle)
export default class DachuiReaderController extends Controller {

    @routerDecorator.get('/bookshelf')
    public async bookselfList () {
        const { ctx } = this;
        const { user } = ctx.state;
        if (user) {
            ctx.body = user.books;
        }
    }
}
