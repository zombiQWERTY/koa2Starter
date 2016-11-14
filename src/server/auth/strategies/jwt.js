import { Strategy as JWTStrategy, ExtractJwt } from 'passport-jwt';
import User                                    from '../../models/User/User';
import { auth as config }                      from '../config';

const opts = {
  jwtFromRequest: ExtractJwt.fromAuthHeader(),
  secretOrKey:    config.secret
};

export default new JWTStrategy(opts, async (jwtPayload, done) => {
  // console.log('JWT Strategy: ', jwtPayload);

  try {
    const user = await User.findById(jwtPayload.id);
    done(null, user || false);
  } catch (error) {
    done(error, false);
  }
});
