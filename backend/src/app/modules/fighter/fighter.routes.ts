import { Router } from 'express';
import auth from '../../middlewares/auth';
import validateRequest from '../../middlewares/validateRequest';
import { FighterController } from './fighter.controller';
import { FighterValidation } from './fighter.validation';

const router = Router();

router.post(
  '/',
  auth('ADMIN', 'MANAGER'),
  validateRequest(FighterValidation.createFighter),
  FighterController.createFighter
);

router.get('/', FighterController.getAllFighters);
router.get('/:id', FighterController.getSingleFighter);

router.patch(
  '/:id',
  auth('ADMIN', 'MANAGER'),
  validateRequest(FighterValidation.updateFighter),
  FighterController.updateFighter
);

router.delete(
  '/:id',
  auth('ADMIN'),
  FighterController.deleteFighter
);

export const FighterRoutes = router;
