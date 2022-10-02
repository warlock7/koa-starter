import KoaRouter from 'koa-router';

const router = new KoaRouter();

router.get('/sr', async (ctx, next) => {
  ctx.logger.info('You have hit sample route api!');

  ctx.status = 200;
  ctx.body = {
    message: 'This is a samlpe route.',
  };
  return next();
});

export default router;
