import { passwordHash } from '../../../utils';
import User             from '../../../models/User/User';

/**
 * @api {post} /api/auth/register Register new user
 * @apiName Registeruser
 * @apiGroup Auth
 *
 * @apiParam {String} email Account email
 * @apiParam {String} password Account password
 *
 * @apiSuccess {String} token valid jwt token with encrypted data
 * @apiSuccess {Object} user user info
 *
 * @apiVersion 1.0.0
 */

async function registerUser(ctx, next) {
  if ('user' in ctx.passport) { await next(); }

  const data = ctx.request.body;
  const registerConds = data.email && data.password;

  if (!registerConds) {
    ctx.status = 400;
    ctx.body   = { status: 'error', message: 'One (or several) fields are invalid.'};
    return;
  }

  try {
    let user = await User.findOne({ email: data.email });

    if (user) {
      ctx.status = 400;
      ctx.body   = { status: 'error', message: 'This email already registered.'};
      return;
    }

    data.password = await passwordHash(data.password);

    user = new User(data);
    await user.save();

    ctx.passport = {
      user: user._id
    };

    await next();
  } catch (e) {
    console.log(e);
  }
}

export default registerUser;
