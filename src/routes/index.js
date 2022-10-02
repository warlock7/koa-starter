import compose from 'koa-compose';

import { sampleRouteAPI } from './sampleRoute';

const routeMiddleware = compose([sampleRouteAPI.routes(), sampleRouteAPI.allowedMethods()]);

export default routeMiddleware;
