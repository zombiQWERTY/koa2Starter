import { setError } from '../../utils';

export default (router) => {
  router.get('/', welcome);
};

const welcome = async (ctx, next) => {
  try {
    await next();
    ctx.render('welcome');
  } catch (error) {
    setError(ctx, error);
  }
};
