import { Request, Response, NextFunction } from 'express';
import ErrorHandler from '../utils/ErrorHandler';
import { CatchAsyncError } from '../middleware/catchAsyncErrors';
import { generateLast12MothsData } from '../utils/analytics.generator';
import userModel from '../models/user.model';
import CourseModel from '../models/course.model';
import OrderModel from '../models/order.Model';

// get users analytics --- only for admin
export const getUsersAnalytics = CatchAsyncError(
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const users = await generateLast12MothsData(userModel);

      res.status(200).json({
        success: true,
        users,
      });
    } catch (error: any) {
      return next(new ErrorHandler(error.message, 500));
    }
  }
);

// get courses analytics --- only for admin
export const getCoursesAnalytics = CatchAsyncError(
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const courses = await generateLast12MothsData(CourseModel);

      res.status(200).json({
        success: true,
        courses,
      });
    } catch (error: any) {
      return next(new ErrorHandler(error.message, 500));
    }
  }
);

// get order analytics --- only for admin
export const getOrderAnalytics = CatchAsyncError(
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const orders = await generateLast12MothsData(OrderModel);

      res.status(200).json({
        success: true,
        orders,
      });
    } catch (error: any) {
      return next(new ErrorHandler(error.message, 500));
    }
  }
);

export const getDashboardInfo = CatchAsyncError(
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      // const users = await generateLast12MothsData(userModel);
      // const courses = await generateLast12MothsData(CourseModel);
      // const orders = await generateLast12MothsData(OrderModel);

      const total_user_count = await userModel.countDocuments();
      const total_course_count = await CourseModel.countDocuments();
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      const today_sale_count = await CourseModel.countDocuments({
        createdAt: { $gte: today },
      });
      res.status(200).json({
        success: true,
        // users,
        // courses,
        // orders,
        total_user_count,
        total_course_count,
        today_sale_count,
      });
    } catch (error: any) {
      return next(new ErrorHandler(error.message, 500));
    }
  }
);
