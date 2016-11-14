import User from '../../../models/User/User';
/**
 * @api {patch} /api/user/:userId Update user info
 * @apiName UpdateUser
 * @apiGroup User
 *
 * @apiParam {String} userId User account id
 *
 * @apiParam {Object} data Data to update
 *
 * @apiVersion 1.0.0
 */

async function editUser(ctx, next) {
  if (!ctx.passport.user) {
    ctx.status = 401;
    return;
  }

  const data = ctx.request.body;

  try {
    await User.update({ id: ctx.params.userId }, data);
    const user = await User.findById(ctx.params.userId);

    if (!user) {
      ctx.status = 404;
      ctx.body   = { message: 'User not found' };
      return;
    }

    ctx.status = 200;
    ctx.body   = { message: 'Success updating user info', userInfo: user };
  } catch (e) {
    console.log(e);
  }
}

export default editUser;
