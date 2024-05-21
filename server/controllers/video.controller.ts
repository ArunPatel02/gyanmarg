import { NextFunction, Request, Response } from 'express';
import { CatchAsyncError } from '../middleware/catchAsyncErrors';
import ErrorHandler from '../utils/ErrorHandler';
import VideoModel from '../models/video.model';
import SectionModel from '../models/section.model';

export const getVideo = CatchAsyncError(
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { videoId } = req.params;
      const data = await VideoModel.findById(videoId);
      return res.status(200).json({
        message: 'Video fetched successfully',
        data,
      });
    } catch (error: any) {
      return next(new ErrorHandler(error.message, 400));
    }
  }
);

export const updateVideoDetail = CatchAsyncError(
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { videoId } = req.params;
      const data = await VideoModel.updateOne({ _id: videoId }, req.body);
      return res.status(200).json({
        message: 'Successfully video updated',
        data,
      });
    } catch (error: any) {
      return next(new ErrorHandler(error.message, 400));
    }
  }
);

export const addVideo = CatchAsyncError(
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { id: sectionId } = req.params;
      const data = req.body;
      const course = await VideoModel.create(data);
      await SectionModel.updateOne(
        { _id: sectionId },
        { $push: { videos: course._id } }
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

export const reorderVideos = CatchAsyncError(
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { sectionId } = req.params;
      const { videos } = req.body;
      await SectionModel.updateOne({ _id: sectionId }, { $set: { videos } });

      res.status(201).json({
        success: true,
        input: req.body,
      });
    } catch (error: any) {
      return next(new ErrorHandler(error.message, 500));
    }
  }
);

export const deleteVideo = CatchAsyncError(
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { videoId } = req.params;
      const video = await VideoModel.deleteOne({ _id: videoId });
      console.log(video, 'video');
      await SectionModel.updateMany(
        { videos: videoId },
        { $pull: { videos: videoId } }
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
