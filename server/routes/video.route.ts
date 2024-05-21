import express from 'express';
import {} from '../controllers/user.controller';
import { authorizeRoles, isAutheticated } from '../middleware/auth';
import {
  addVideo,
  deleteVideo,
  getVideo,
  reorderVideos,
  updateVideoDetail,
} from '../controllers/video.controller';
import * as validations from '../validations/video.validation';

const router = express.Router();

router.get('/videos/:videoId', isAutheticated, getVideo);

router.put(
  '/videos/:videoId',
  validations.updateVideoDetail,
  isAutheticated,
  updateVideoDetail
);

router.post(
  `/sections/:id/add-video`,
  isAutheticated,
  authorizeRoles('admin'),
  addVideo
);

router.put(
  `/sections/:sectionId/reorder-videos`,
  validations.reorderVideos,
  isAutheticated,
  authorizeRoles('admin'),
  reorderVideos
);

// DELETE VIDEO
router.delete(
  `/videos/:videoId`,
  isAutheticated,
  authorizeRoles('admin'),
  deleteVideo
);

export default router;
