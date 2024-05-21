import { NextFunction, Request, Response } from 'express';
import { CatchAsyncError } from '../middleware/catchAsyncErrors';
import ErrorHandler from '../utils/ErrorHandler';
import RepositoryModel from '../models/repository.model';
// https://hackernoon.com/githubs-top-100-most-valuable-repositories-out-of-96-million-bb48caa9eb0b

export const addRepository = CatchAsyncError(
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      console.log(req.body);
      const {
        title,
        url,
        tags,
      }: { title: string; url: string; tags: string[] } = req.body;
      await RepositoryModel.create({ title, url, tags });
      res.status(200).json({
        success: true,
      });
    } catch (error: any) {
      return next(new ErrorHandler(error.message, 500));
    }
  }
);

export const removeRepository = CatchAsyncError(
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const id = req.params.id;
      console.log(id, 'id')
      await RepositoryModel.findByIdAndDelete(id);
      res.status(200).json({
        success: true,
      });
    } catch (error: any) {
      return next(new ErrorHandler(error.message, 500));
    }
  }
);

export const getRepositories = CatchAsyncError(
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const repos = await RepositoryModel.find({});
      res.status(200).json({
        success: true,
        repos,
      });
    } catch (error: any) {
      return next(new ErrorHandler(error.message, 500));
    }
  }
);
