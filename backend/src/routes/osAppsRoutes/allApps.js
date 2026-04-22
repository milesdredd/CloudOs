import exp from 'express';

const route = exp.Router();
import { handleAppList, addApp } from '../../controller/allApps.handeler.js';

route.get('/appList', handleAppList);
route.post('/appList', addApp);

export default route;