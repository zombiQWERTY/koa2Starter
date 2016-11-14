import passport           from 'koa-passport';
import compose            from 'koa-compose';
import jwt                from 'jsonwebtoken';
import User               from '../models/User/User';
import { auth as config } from './config';

/** Strategies */
import jwtStrategy        from './strategies/jwt';
import emailStrategy      from './strategies/email';

passport.use('jwt', jwtStrategy);
passport.use('email', emailStrategy);

passport.serializeUser((user, done) => done(null, user._id));
passport.deserializeUser((id, done) => User.findById(id, done));

export default function auth() {
  return compose([
    passport.initialize()
  ]);
}

export function authenticate() {
  return passport.authenticate('jwt');
}

export function needsGroup(params = {}) {
  return compose([
    passport.authenticate('jwt'),
    async function(ctx, next) {
      const user = ctx.passport.user;
      if (!user) {
        ctx.status = 401;
        ctx.body   = 'Unauthorized';
        return;
      }
      await next();
    }
  ]);
}

export function authEmail() {
  return passport.authenticate('email');
}

/** After authentication using one of the strategies, generate a JWT token */

export function generateToken() {
  return async ctx => {
    const { user } = ctx.passport;
    ctx.assert(user, 401);

    const _token = jwt.sign({ id: user }, config.secret);
    const token = `JWT ${_token}`;

    const currentUser = await User.findById(user);

    ctx.status = 200;
    ctx.body   = {
      token,
      user: currentUser
    };
  };
}
