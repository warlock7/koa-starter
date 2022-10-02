import { getClientIp } from '@supercharge/request-ip';

const getRequestIp = (ctx, next) => {
  ctx.ipAddress = getClientIp(ctx.request);
  return next();
};

export default getRequestIp;
