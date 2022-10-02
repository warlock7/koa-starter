import { ExpiredTokenError, LoggedOutUserError, TokenNotFoundError } from '../constants/errors';

export default async function errorHandler(ctx, next) {
  const {
    ipAddress,
    request: { url, body },
  } = ctx;
  const logBody = { ...body };
  delete logBody.password;

  try {
    await next();
    console.log(`${ctx.status} ${url} ${ipAddress}`, {
      body: logBody,
    });
  } catch (err) {
    delete err.dataSet;
    const errorMessage = typeof err === 'string' ? err : err.message;
    const statusCode = [ExpiredTokenError, LoggedOutUserError, TokenNotFoundError].includes(
      errorMessage,
    )
      ? 401
      : 400;

    ctx.body = { message: errorMessage };
    ctx.status = statusCode;

    ctx.logger.error(`${statusCode} ${url} ${ipAddress}`, err, {
      body: logBody,
    });
  }
}
