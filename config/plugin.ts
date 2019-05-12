
import { EggPlugin } from 'egg';

const plugin: EggPlugin = {
    static: {
        enable: true,
        env: ['prod', 'test']
    },
    ejs: {
        enable: true,
        package: 'egg-view-ejs',
    },
    mongoose: {
        enable: true,
        package: 'egg-mongoose',
    },
    cors: {
        enable: true,
        package: 'egg-cors',
    }
};

export default plugin;
