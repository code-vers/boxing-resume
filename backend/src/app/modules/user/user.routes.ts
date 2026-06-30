import { Router } from 'express';

import auth from '../../middlewares/auth';
import validateRequest from '../../middlewares/validateRequest';
import { uploadProfileImage } from '../../utils/upload';
import { UserController } from './user.controller';
import { UserValidation } from './user.validation';

const router = Router();

router.get('/me', auth('USER', 'MANAGER', 'ADMIN'), UserController.getMe);
router.patch('/me', auth('USER', 'MANAGER', 'ADMIN'), validateRequest(UserValidation.updateProfile), UserController.updateProfile);
router.post('/me/image', auth('USER', 'MANAGER', 'ADMIN'), uploadProfileImage.single('image'), UserController.updateProfileImage);
router.get('/', auth('ADMIN', 'MANAGER'), UserController.getAllUsers);
router.patch(
  '/:id/role',
  auth('ADMIN'),
  validateRequest(UserValidation.changeRole),
  UserController.changeRole
);

export const UserRoutes = router;
