import { Router } from 'express';

import * as Admins from '../controllers/DBManager/admins.js';
import * as User from '../controllers/DBManager/user.js';

const router = new Router();

router.route('/admins').get(Admins.getAllAdmins).post(Admins.insertAdmin);

router
  .route('/admins/:id')
  .delete(Admins.deleteAdminById)
  .put(Admins.updateAdminById);

router.route('/user/login').get(User.getUser);

export default router;
