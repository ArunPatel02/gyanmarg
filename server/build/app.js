"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.app = void 0;
require('dotenv').config();
const express_1 = __importDefault(require("express"));
exports.app = (0, express_1.default)();
const cors_1 = __importDefault(require("cors"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const error_1 = require("./middleware/error");
const user_route_1 = __importDefault(require("./routes/user.route"));
const course_route_1 = __importDefault(require("./routes/course.route"));
const order_route_1 = __importDefault(require("./routes/order.route"));
const notification_route_1 = __importDefault(require("./routes/notification.route"));
const analytics_route_1 = __importDefault(require("./routes/analytics.route"));
const section_route_1 = __importDefault(require("./routes/section.route"));
const video_route_1 = __importDefault(require("./routes/video.route"));
const layout_route_1 = __importDefault(require("./routes/layout.route"));
const express_rate_limit_1 = require("express-rate-limit");
const path_1 = __importDefault(require("path"));
const repository_route_1 = __importDefault(require("./routes/repository.route"));
// body parser
exports.app.use(express_1.default.json({ limit: '50mb' }));
// cookie parser
exports.app.use((0, cookie_parser_1.default)());
// cors => cross origin resource sharing
exports.app.use((0, cors_1.default)({
    origin: ['http://localhost:3000', 'https://gyanmarg.vercel.app', 'https://gyanmarg-ed.vercel.app'],
    credentials: true,
}));
exports.app.use(express_1.default.static(path_1.default.join(__dirname, './mails')));
// api requests limit
const limiter = (0, express_rate_limit_1.rateLimit)({
    windowMs: 15 * 60 * 1000,
    max: 100,
    standardHeaders: 'draft-7',
    legacyHeaders: false,
});
exports.app.get("/", (req, res) => {
    res.send("Welcome to gyanMarg");
});
// routes
exports.app.use('/api/v1', user_route_1.default, order_route_1.default, course_route_1.default, notification_route_1.default, analytics_route_1.default, layout_route_1.default, repository_route_1.default, video_route_1.default, section_route_1.default);
// testing api
exports.app.get('/test', async (req, res, next) => {
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
exports.app.all('*', (req, res, next) => {
    const err = new Error(`Route ${req.originalUrl} not found`);
    err.statusCode = 404;
    next(err);
});
// middleware calls
exports.app.use(limiter);
exports.app.use(error_1.ErrorMiddleware);
