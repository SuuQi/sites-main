import { Controller } from 'egg';
import routerDecorator from 'egg-router-decorator';
import { checkUserMiddle } from '../utils';
import { findIndex } from 'lodash';

export type IBookItem = {
    id: string,
    lastIndex: number
}

/**
 * 大锤阅读器相关接口
 */
@routerDecorator.prefix('/reader', checkUserMiddle)
export default class DachuiReaderController extends Controller {

    @routerDecorator.get('/bookshelf')
    public async bookselfList () {
        const { ctx } = this;
        ctx.body = ctx.state.user.books;
    }

    @routerDecorator.post('/bookshelf')
    @routerDecorator.put('/bookshelf')
    public async bookselfAdd () {
        const { ctx } = this;
        const { user } = ctx.state;
        const book = ctx.request.body;
        const bookIndex = findIndex<IBookItem>(user.books, { id: book.id });
        if (bookIndex === -1) {
            user.books.push(book);
        } else {
            user[bookIndex] = book;
        }
        await user.save();
        ctx.body = user.books;
    }
}
