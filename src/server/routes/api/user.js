import { authenticate } from '../../auth';

import editUser         from './user/editUser';

export default (router) => {
  router.patch('/user/:userId', authenticate(), editUser);
};
