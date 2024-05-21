require('dotenv').config();
import express, { NextFunction, Request, Response } from 'express';
export const app = express();
import cors from 'cors';
import cookieParser from 'cookie-parser';
import { ErrorMiddleware } from './middleware/error';
import userRouter from './routes/user.route';
import courseRouter from './routes/course.route';
import orderRouter from './routes/order.route';
import notificationRouter from './routes/notification.route';
import analyticsRouter from './routes/analytics.route';
import sectionRouter from './routes/section.route';
import videoRouter from './routes/video.route';
import layoutRouter from './routes/layout.route';
import { rateLimit } from 'express-rate-limit';
import CourseModel from './models/course.model';
import path from 'path';
import repositoryRouter from './routes/repository.route';

// body parser
app.use(express.json({ limit: '50mb' }));

// cookie parser
app.use(cookieParser());

// cors => cross origin resource sharing
app.use(
  cors({
    origin: ['http://localhost:3000', 'https://gyanmarg.vercel.app', 'https://gyanmarg-ed.vercel.app/'],
    credentials: true,
  })
);

app.use(express.static(path.join(__dirname, './mails')));

// api requests limit
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
  standardHeaders: 'draft-7',
  legacyHeaders: false,
});

app.get("/" , (req , res)=>{
  res.send("Welcome to gyanMarg")
})

// routes
app.use(
  '/api/v1',
  userRouter,
  orderRouter,
  courseRouter,
  notificationRouter,
  analyticsRouter,
  layoutRouter,
  repositoryRouter,
  videoRouter,
  sectionRouter
);

// testing api
app.get('/test', async (req: Request, res: Response, next: NextFunction) => {
  res.status(200).json({
    succcess: true,
    message: 'API is working now',
  });
  // const courses = await CourseModel.find({});
  // CourseModel.updateOne(
  //   { _id: courses[0]._id },
  //   {
  //     sections: [
  //       '65991e9d74cff0d5ddfc4adf',
  //       '6599269974cff0d5ddfc4b7b',
  //       '65a8128360116db94848b12a',
  //       '65992ea074cff0d5ddfc4cf2',
  //       '65991e9d74cff0d5ddfc4ae2',
  //       '65aab0e3afdb9d555975e8d8',
  //       '65aab80aafdb9d555975eacb',
  //       '65aab92cafdb9d555975ece6',
  //       '65be0f38afdb9d555976009a',
  //     ],
  //   }
  // )
  //   .then((res) => {
  //     console.log(res, 'res');
  //   })
  //   .catch((err) => {
  //     console.log(err, 'err');
  //   });
  // CourseModel.updateOne(
  //   { _id: courses[1]._id },
  //   {
  //     sections: ['65a68d42a584017e9842ea18', '65a68e17a584017e9842eb2a'],
  //   }
  // )
  //   .then((res) => {
  //     console.log(res, 'res');
  //   })
  //   .catch((err) => {
  //     console.log(err, 'err');
  //   });

  // [
  //   new ObjectId("65a68d42a584017e9842ea18"),
  //   new ObjectId("65a68e17a584017e9842eb2a")
  // ]
  // courses.map((course) => {
  //   // course.sections
  //   console.log(
  //     // course.sections,
  //     course.sections.map((section) => section._id)
  //   );

  //   // const sections = course.sections.map((section) => section._id);
  //   // CourseModel.updateOne(
  //   //   { _id: course._id },
  //   //   {
  //   //     sections,
  //   //   }
  //   // );
  // });

  // // console.log(courses[0].sections, 'course');
  // courses[0].sections.map((section) => {
  //   // console.log(section, 'section');
  //   // const videos = section.videos;
  //   const videos = section.videos.map((video) => video._id);
  //   // console.log(vidoes, 'videos');
  //   const data = {
  //     _id: section._id,
  //     title: section.title,
  //     videos,
  //   };
  //   // console.log(data, 'data');
  //   // SectionModel.create(data)
  //   //   .then((res) => {
  //   //     console.log(res, 'res');
  //   //   })
  //   //   .catch((err) => {
  //   //     console.log(err, 'err');
  //   //   });
  // });
  // return;
  // courses.map((course: any) => {
  //   console.log(course?.name, course?.courseData, 'course');
  //   const uSections: any = {};
  //   course?.courseData?.forEach(({ videoSection, ...rest }: any) => {
  //     uSections[videoSection] = uSections[videoSection]
  //       ? uSections[videoSection].push(rest)
  //       : [rest];
  //   });
  //   console.log(uSections, 'uSections');
  //   // const updated = {
  //   //   ...course,
  //   //   sections,
  //   // };
  // });
  // res.status(200).json({
  //   succcess: true,
  //   message: 'API is working',
  // });
});

// unknown route
app.all('*', (req: Request, res: Response, next: NextFunction) => {
  const err = new Error(`Route ${req.originalUrl} not found`) as any;
  err.statusCode = 404;
  next(err);
});

// middleware calls
app.use(limiter);
app.use(ErrorMiddleware);
