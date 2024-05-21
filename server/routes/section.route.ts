import express from 'express';
import * as controllers from '../controllers/section.controller';
import { authorizeRoles, isAutheticated } from '../middleware/auth';
import * as validation from '../validations/section.validation';

const router = express.Router();

// router.post(
//   '/sections',
//   validation.addSection,
//   isAutheticated,
//   controllers.addSection
// );

router.post(
  `/courses/:id/add-section`,
  validation.addSection,
  isAutheticated,
  authorizeRoles('admin'),
  controllers.addSection
);

router.post(
  `/courses/:id/embed-section`,
  isAutheticated,
  authorizeRoles('admin'),
  controllers.embedSection
);

router.put(
  '/sections/:sectionId',
  validation.addSection,
  isAutheticated,
  controllers.updateSection
);

export default router;
