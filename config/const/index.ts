import * as CommonConfig from '../../common/config';
import { readFileSync } from 'fs';
import { homedir } from 'os';
import { resolve } from 'path';

/** 从sites-main-config.json读取私密信息 */
const extraConfig = (function () {
    try {
        const extraConfig = readFileSync(resolve(homedir(), './sites-main-config.json'));
        return JSON.parse(extraConfig.toString())
    } catch (e) {
        console.error('读取解析~/sites-main-config.json失败，建议检查相关文件');
        return {};
    }

})();

export default {
    ...extraConfig,
    ...CommonConfig,
    ...process.env,
} as any;
