/*
 * @Author: hzsuqin 
 * @Date: 2018-10-04 10:19:05
 * @Last Modified by: hzsuqin
 * @Last Modified time: 2018-10-04 10:19:25
 * @description: helper工具方法集合
 */

import * as xlsx from 'xlsx';

import { randomString } from '../../common/utils';

export default {

    /** 生成随机hash */
    randomString,

    /**
     * 将数据转化成xlsx，返回buffer，可通过ctx.body直接返回
     * @param  {Array} list 数据列表，例如：[['iphone', 1], ['apple watch', 1]]
     * @return {Buffer} 返回转化后的buffer
     */
    exportListToXlsx (list) {
        const wb = xlsx.utils.book_new();
        const ws = xlsx.utils.aoa_to_sheet(list);
        xlsx.utils.book_append_sheet(wb, ws);
        return xlsx.write(wb, { type: 'buffer' });
    }
};
