import { NextFunction, Response, Request } from 'express';
import { CatchAsyncError } from '../middleware/catchAsyncErrors';
import ErrorHandler from '../utils/ErrorHandler';
import SectionModel from '../models/section.model';
import messages from '../constants/messages';
import CourseModel from '../models/course.model';

// add section
// export const addSection = CatchAsyncError(
//   async (req: Request, res: Response, next: NextFunction) => {
//     try {
//       const data = req.body;
//       const section = await SectionModel.create(data);
//       return res.status(200).send({
//         message: messages.section_added,
//         data: section,
//       });
//     } catch (error: any) {
//       return next(new ErrorHandler(error.message, 400));
//     }
//   }
// );

export const addSection = CatchAsyncError(
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { id: courseId } = req.params;
      const data = req.body;
      const course = await SectionModel.create(data);
      await CourseModel.updateOne(
        { _id: courseId },
        { $push: { sections: course._id } }
      );
      res.status(201).json({
        success: true,
        data: course,
        input: req.body,
      });
    } catch (error: any) {
      return next(new ErrorHandler(error.message, 500));
    }
  }
);

// update section details
export const updateSection = CatchAsyncError(
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { sectionId } = req.params;
      const data = req.body;
      const section = await SectionModel.updateOne({ _id: sectionId }, data);
      return res.status(200).send({
        message: messages.section_added,
        data: section,
      });
    } catch (error: any) {
      return next(new ErrorHandler(error.message, 500));
    }
  }
);

export const embedSection = CatchAsyncError(
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { id: courseId } = req.params;
      const { sectionId } = req.body;

      const section = await SectionModel.findById(sectionId);
      if (!section) {
        return res.status(404).json({
          message: 'Section not found',
        });
      }
      await CourseModel.updateOne(
        { _id: courseId },
        { $push: { sections: section._id } }
      );
      res.status(201).json({
        success: true,
        input: req.body,
      });
    } catch (error: any) {
      return next(new ErrorHandler(error.message, 500));
    }
  }
);
