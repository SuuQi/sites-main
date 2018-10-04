import { EggAppConfig, EggAppInfo, PowerPartial } from 'egg';
import * as path from 'path';

export default (appInfo: EggAppInfo) => {
    const config: PowerPartial<EggAppConfig> = {};

    config.view = {
        root: path.join(appInfo.baseDir, 'client'),
        mapping: {
            '.ejs': 'ejs'
        }
    }
    
    config.static = {
        prefix: '/public/',
        dir: path.join(appInfo.baseDir, 'client/public')
    };

    return config;
};
