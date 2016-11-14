import { Strategy as CustomStrategy } from 'passport-custom';
import User                           from '../../models/User/User';
import { passwordCompare }            from '../../utils';

export default new CustomStrategy(async (ctx, done) => {
  // console.log('Email Strategy: ', ctx.body);

  try {
    /** Test whether is a login using email and password */
    const loginConds = ctx.body.email && ctx.body.password;

    if (!loginConds) { done(null, false); }
    if (loginConds) {
      const user = await User.findOne({ email: ctx.body.email });
      if (!user) { done(null, false); }
      if (!await passwordCompare(ctx.body.password, user.password)) { done(null, false); }

      done(null, user);
    }
  } catch (error) {
    done(error);
  }
});
