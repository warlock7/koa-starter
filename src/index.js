import app from './app';
import logger from './logger';

const { NODE_ENV: nodeEnv, PORT: port } = process.env;

const server = app.listen(port, () => {
  logger.info(`Server is listening at ${port}, ${nodeEnv}`);
});

// set timeout of 10m
server.setTimeout(10 * 60 * 1000);

export default server;
