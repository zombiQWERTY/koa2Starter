/**
 * @api {delete} /api/auth/logout Logout and delete JWT
 * @apiName LogoutUser
 * @apiGroup Auth
 *
 * @apiSuccess {String} message status of logout
 *
 * @apiVersion 1.0.0
 */

async function logout(ctx, next) {
  try {
    await ctx.logout();
    ctx.redirect('/');

    ctx.body   = { message: 'Successfully logged out.' };
    ctx.status = 200;
  } catch (e) {
    console.log(e);
  }
}

export default logout;
