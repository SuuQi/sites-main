import { EggAppConfig, EggAppInfo, PowerPartial } from 'egg';
import Const from './const';

const MONGODB_URI = 'mongodb://127.0.0.1/sites-main';

export default (appInfo: EggAppInfo) => {
    const config: PowerPartial<EggAppConfig> = {};

    config.keys = appInfo.name + '_1537442153535_79088';

    config.ejs = {
        delimiter: '$'
    };

    config.logger = {
    };

    config.mongoose = {
        client: {
            url: MONGODB_URI || process.env.MONGODB_URI,
            options: {}
        }
    };

    config.errorHandler = {};
    
    config.middleware = [ 'errorHandler' ];

    return {
        ...Const,
        ...config
    };
};