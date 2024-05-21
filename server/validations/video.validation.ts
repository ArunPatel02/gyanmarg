import { Request, Response, NextFunction } from 'express';
import z from 'zod';

const updateVideoDetailSchema = z
  .object({
    videoUrl: z.string().optional(),
    videoThumbnail: z.string().optional(),
    title: z.string().optional(),
    description: z.string().optional(),
    videoLength: z.number().optional(),
    videoPlayer: z.string().optional(),
    links: z.array(z.object({ title: z.string(), url: z.string() })).optional(),
    suggestion: z.string().optional(),
    questions: z.array(z.string()).optional(),
    published: z.boolean().optional(),
  })
  .strict();

export type UpdateVideoDetailDto = z.infer<typeof updateVideoDetailSchema>;

export const updateVideoDetail = async (
  req: Request<{}, {}, UpdateVideoDetailDto>,
  res: Response,
  next: NextFunction
) => {
  try {
    await updateVideoDetailSchema.parseAsync(req.body);
    next();
  } catch (err: any) {
    // console.log(err, 'eror');
    return res.status(400).send({
      //   error: err,
      message: err.issues[0].message,
    });
    // next(err);
  }
};

// reorder videos
const reorderVideosSchema = z
  .object({
    videos: z.array(z.string()),
  })
  .strict();

export type ReorderVideosDto = z.infer<typeof reorderVideosSchema>;

export const reorderVideos = async (
  req: Request<{}, {}, ReorderVideosDto>,
  res: Response,
  next: NextFunction
) => {
  try {
    console.log(req.body);
    await reorderVideosSchema.parseAsync(req.body);
    next();
  } catch (err: any) {
    // console.log(err, 'eror');
    return res.status(400).send({
      //   error: err,
      message: err.issues[0].message,
    });
    // next(err);
  }
};
