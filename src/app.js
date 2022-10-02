import 'core-js/stable';
import 'regenerator-runtime/runtime';
import Koa from 'koa';
import bodyParser from 'koa-bodyparser';
import compress from 'koa-compress';
import { userAgent } from 'koa-useragent';
import zlib from 'zlib';
import Cabin from 'cabin';
import { Signale } from 'signale';
import responseTime from 'koa-better-response-time';
import requestId from 'koa-better-request-id';
import requestReceived from 'request-received';

import logger from './logger';
import router from './routes';
import { getRequestIp, errorHandler as errorHandlerMiddleware } from './middlewares';

const { NODE_ENV } = process.env;

process.on('uncaughtException', (exception) => {
  console.log(`UncaughtException : ${exception}`);
});

process.on('unhandledRejection', (reason, p) => {
  console.log(`Unhandled Rejection at: Promise , ${p}, \n%brReason: , ${reason}`);
});

process.addListener('SIGPIPE', (exc) => {
  console.log(`SIGPIPE : ${exc}`);
});

const app = new Koa();
const cabin = new Cabin({
  axe: {
    logger: NODE_ENV === 'production' ? logger : new Signale(),
  },
});

// adds request received hrtime and date symbols to request object
// (which is used by Cabin internally to add `request.timestamp` to logs
app.use(requestReceived);

// adds `X-Response-Time` header to responses
app.use(responseTime());

// adds or re-uses `X-Request-Id` header
app.use(requestId());

app.use(
  compress({
    filter(contentType) {
      return /json|text/i.test(contentType);
    },
    threshold: 1,
    flush: zlib.constants.Z_SYNC_FLUSH,
  }),
);

// get request ip address
app.use(getRequestIp);

app.use(cabin.middleware);

app.use(userAgent);

// request body parser
app.use(
  bodyParser({
    jsonLimit: '5mb',
  }),
);

// error handling middleware
app.use(errorHandlerMiddleware);

// add routes to app
app.use(router);

app.proxy = true;

export default app;
