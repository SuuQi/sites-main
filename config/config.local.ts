import { EggAppConfig, EggAppInfo, PowerPartial } from 'egg';
import * as path from 'path';

export default (appInfo: EggAppInfo) => {
    const config: PowerPartial<EggAppConfig> = {};

    config.view = {
        root: path.join(appInfo.baseDir, 'dist/client'),
        mapping: {
            '.ejs': 'ejs'
        }
    }

    return config;
};
