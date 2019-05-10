import { Controller } from 'egg';
import routerDecorator from 'egg-router-decorator';
import { checkReaderUserMiddleWare } from '../utils';
import { findIndex, remove, assign } from 'lodash';

export type IUserBookItem = {
    title: string
    id: string
    book: string // 另一个id，未知含义
    chaptersUpdated: string // 最近更新时间 2018-02-06T12:12:47.907Z
    updated: string // 最近更新时间 2018-02-06T12:12:47.907Z
    lastIndex: number
}

/**
 * 大锤阅读器相关接口
 */
@routerDecorator.prefix('/reader', checkReaderUserMiddleWare)
export default class DachuiReaderController extends Controller {

    @routerDecorator.get('/bookshelf')
    public async bookselfList () {
        const { ctx } = this;
        ctx.body = ctx.state.user.books;
    }

    @routerDecorator.post('/bookshelf')
    public async bookselfAdd () {
        const { ctx } = this;
        const { user } = ctx.state;
        const book = ctx.request.body;
        const bookIndex = findIndex<IUserBookItem>(user.books, { id: book.id });
        if (bookIndex === -1) {
            user.books.push(book);
        } else {
            assign(user.books[bookIndex], book);
        }
        await user.save();
        ctx.body = user.books;
    }

    @routerDecorator.put('/bookshelf/:id')
    public async bookselfUpdate () {
        const { ctx } = this;
        const { user } = ctx.state;
        const book = ctx.request.body;
        const bookIndex = findIndex<IUserBookItem>(user.books, { id: ctx.params.id });
        if (bookIndex === -1) {
            // 没有加入过书架，不处理
        } else {
            assign(user.books[bookIndex], book);
        }
        await user.save();
        ctx.body = user.books;
    }

    @routerDecorator.del('/bookshelf/:id')
    public async bookselfDelete () {
        const { ctx } = this;
        const { user } = ctx.state;
        remove<IUserBookItem>(user.books, { id: ctx.params.id })
        await user.save();
        ctx.body = user.books;
    }
}
