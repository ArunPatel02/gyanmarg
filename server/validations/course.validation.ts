import { Request, Response, NextFunction } from 'express';
import z from 'zod';

const createCourseSchema = z.object({
  name: z.string(),
  description: z.string(),
  tags: z.string(),
  level: z.string(),
  categories: z.string(),
  demoUrl: z.string(),
  thumbnail: z.string(),
  benefits: z.array(z.object({ title: z.string() })),
  prerequisites: z.array(z.object({ title: z.string() })),
});

export type CreateCourseDto = z.infer<typeof createCourseSchema>;
export const createCourse = async (
  req: Request<{}, {}, CreateCourseDto>,
  res: Response,
  next: NextFunction
) => {
  try {
    await createCourseSchema.parseAsync(req.body);
    next();
  } catch (err: any) {
    next(err);
  }
};

// type CreateCourseType = z.infer<typeof>
