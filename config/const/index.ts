import * as CommonConfig from '../../common/config';

export default {
    ...CommonConfig,
    ...process.env,
} as any;
