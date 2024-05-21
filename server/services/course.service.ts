import { Response } from 'express';
import CourseModel from '../models/course.model';
import { CatchAsyncError } from '../middleware/catchAsyncErrors';
import VideoModel from '../models/video.model';

// create course
export const createCourse = CatchAsyncError(
  async (data: any, res: Response) => {
    const course = await CourseModel.create(data);
    res.status(201).json({
      success: true,
      course,
    });
  }
);

// Get All Courses
export const getAllCoursesService = async (res: Response) => {
  const courses = await CourseModel.find()
    .populate({
      path: 'sections',
      populate: {
        path: 'videos',
        model: 'Video', // Adjust the model name accordingly
      },
    })
    .sort({ createdAt: -1 });

  res.status(201).json({
    success: true,
    courses,
  });
};
