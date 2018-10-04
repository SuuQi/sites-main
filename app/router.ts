import { Application } from 'egg';
import { Blueprint } from 'egg-router-decorator';

export default (app: Application) => {
    Blueprint(app, { prefix: '/api' });
};
