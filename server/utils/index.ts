/*
 * @Author: hzsuqin 
 * @Date: 2018-05-30 15:58:40 
 * @Last Modified by: hzsuqin@corp.netease.com
 * @Last Modified time: 2018-06-30 17:48:09
 * @description: utils工具方法集合
 */

import xlsx from 'xlsx';
import fs from 'fs';

// 输出处理大数字的json工具类
import * as JSONBigInt from '../../common/JSONBigInt';
export { JSONBigInt };

/**
 * 将数据转化成xlsx，返回buffer，可通过ctx.body直接返回
 * @param  {Array} list 数据列表，例如：[['iphone', 1], ['apple watch', 1]]
 * @return {Buffer} 返回转化后的buffer
 */
export function exportListToXlsx (list) {
    const wb = xlsx.utils.book_new();
    const ws = xlsx.utils.aoa_to_sheet(list);

    xlsx.utils.book_append_sheet(wb, ws);

    return xlsx.write(wb, { type: 'buffer' });
}
