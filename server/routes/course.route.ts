import express from 'express';
import {
  addAnwser,
  addQuestion,
  addReplyToReview,
  addReview,
  deleteCourse,
  editCourse,
  generateVideoUrl,
  getAdminAllCourses,
  getAllCourses,
  getCourseByUser,
  getSingleCourse,
  uploadCourse,
} from '../controllers/course.controller';
import { authorizeRoles, isAutheticated } from '../middleware/auth';
import * as validation from '../validations/course.validation';

const courseRouter = express.Router();

courseRouter.post(
  '/create-course',
  isAutheticated,
  authorizeRoles('admin'),
  validation.createCourse,
  uploadCourse
);

courseRouter.put(
  '/edit-course/:id',
  isAutheticated,
  authorizeRoles('admin'),
  // validation.createCourse,
  editCourse
);

courseRouter.get('/get-course/:id', getSingleCourse);

courseRouter.get('/get-courses', getAllCourses);

courseRouter.get(
  '/get-admin-courses',
  isAutheticated,
  authorizeRoles('admin'),
  getAdminAllCourses
);

courseRouter.get('/get-course-content/:id', isAutheticated, getCourseByUser);

courseRouter.put('/add-question', isAutheticated, addQuestion);

courseRouter.put('/add-answer', isAutheticated, addAnwser);

courseRouter.put('/add-review/:id', isAutheticated, addReview);

courseRouter.put(
  '/add-reply',
  isAutheticated,
  authorizeRoles('admin'),
  addReplyToReview
);

courseRouter.post('/getVdoCipherOTP', generateVideoUrl);

courseRouter.delete(
  '/delete-course/:id',
  isAutheticated,
  authorizeRoles('admin'),
  deleteCourse
);

export default courseRouter;
