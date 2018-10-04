/*
 * @Author: hzsuqin 
 * @Date: 2018-10-04 10:21:21 
 * @Last Modified by: hzsuqin
 * @Last Modified time: 2018-10-04 10:21:51
 * @description: hello模块Model文件
 */

export default (app: any) => {
    const mongoose = app.mongoose;
    const HelloSchema = new mongoose.Schema({
        name: { type: 'string', required: true }
    });

    return mongoose.model('Hello', HelloSchema);
}
