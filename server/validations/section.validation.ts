import { Request, Response, NextFunction } from 'express';
import z from 'zod';

const addSectionSchema = z
  .object({
    title: z.string(),
  })
  .strict();

export type AddSectionDto = z.infer<typeof addSectionSchema>;

export const addSection = async (
  req: Request<{}, {}, AddSectionDto>,
  res: Response,
  next: NextFunction
) => {
  try {
    await addSectionSchema.parseAsync(req.body);
    next();
  } catch (err: any) {
    console.log(err, 'eror');
    return res.status(400).send({
      message: err.issues[0].message,
    });
  }
};
