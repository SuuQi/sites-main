/*
 * @Author: hzsuqin 
 * @Last Modified by: hzsuqin
 * @description: reader模块Model文件
 */

export default (app: any) => {
    const mongoose = app.mongoose;
    const HelloSchema = new mongoose.Schema({
        openid: { type: 'string', required: true },
        sessionId: { type: 'string', required: true },
        books: [
            {
                id: { type: 'string', required: true },
                lastIndex: { type: 'number', default: 0 }
            }
        ]
    });

    return mongoose.model('ReaderUser', HelloSchema);
}
