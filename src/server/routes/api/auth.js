import {
  authEmail,
  generateToken,
  needsGroup
} from '../../auth';

import registerUser       from './auth/registerUser';
import logout             from './auth/logout';

export default (router) => {
  router.post('/auth/login', authEmail(), generateToken());
  router.post('/auth/register', registerUser, generateToken());
  router.delete('/auth/logout', logout);
};

