"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const cloudinary_1 = require("cloudinary");
const http_1 = __importDefault(require("http"));
const db_1 = __importDefault(require("./utils/db"));
const socketServer_1 = require("./socketServer");
const app_1 = require("./app");
require('dotenv').config();
const server = http_1.default.createServer(app_1.app);
// cloudinary config
cloudinary_1.v2.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.CLOUD_API_KEY,
    api_secret: process.env.CLOUD_SECRET_KEY,
});
(0, socketServer_1.initSocketServer)(server);
let data = {
    name: 'Full Stack Bootcamp',
    description: 'Learn basics to advanced MERN, Basics to advanced Devops, System design and build 3 projects through this journey',
    categories: 'React Js',
    price: 0,
    estimatedPrice: 0,
    tags: 'MERN Stack, React, Node.js, Mongodb, System Desing',
    thumbnail: 'https://res.cloudinary.com/dwjjmwc1v/image/upload/v1703181070/courses/hpps2g1ui2csbpy43jlb.png',
    level: 'Expert',
    demoUrl: 'https://www.youtube.com/watch?v=hfqotwc1gfk&t=24s',
    totalVideos: 2,
    benefits: [
        {
            title: ' The comprehensive Full Stack course offered here provides students with a holistic learning experience, guiding them from the basics to advanced levels in MERN (MongoDB, Express.js, React.js, Node.js) development. By combining frontend and backend expertise, students acquire a versatile skill set highly valued in the industry. The inclusion of DevOps practices ensures they learn to seamlessly integrate development and operations, gaining proficiency in version control, continuous integration, and deployment. System design is a crucial aspect covered in the course, empowering students to architect scalable and efficient applications, make informed technology choices, and align with industry best practices.',
        },
    ],
    prerequisites: [
        {
            title: 'To embark on this enriching journey, students should possess a basic understanding of programming concepts and logic. Familiarity with HTML, CSS, and JavaScript is essential, along with foundational knowledge of databases and version control systems like Git. A grasp of basic command-line usage and web concepts further prepares students for a seamless progression through the course. Above all, a motivational and dedicated mindset is encouraged, as full-stack development can be challenging, requiring consistent effort and a willingness to learn and apply new concepts throughout the course.',
        },
    ],
    courseData: [
        {
            videoUrl: 'https://www.youtube.com/watch?v=hfqotwc1gfk&t=24s',
            title: 'Foundation Javascript, async nature of JS',
            description: 'The course stands out for its emphasis on project-based learning, where students actively engage in developing three projects. This hands-on approach allows them to apply theoretical knowledge in practical scenarios, deepening their understanding and preparing them for real-world challenges. Beyond individual projects, students build a portfolio showcasing their ability to create end-to-end applications, making them competitive candidates in the job market. The continuous learning pathway from basics to advanced levels establishes a strong foundation, enabling students to adapt to evolving technologies in the dynamic field of software development.',
            videoSection: 'Foundation',
            links: [''],
            suggestion: '',
            videoLength: 20,
        },
        {
            videoUrl: 'https://www.youtube.com/watch?v=hfqotwc1gfk&t=24s',
            title: 'Reconcilers and Frontend frameworks',
            description: 'https://www.youtube.com/watch?v=hfqotwc1gfk&t=24s\n',
            videoSection: 'Foundation',
            links: [''],
            videoLength: 20,
        },
        {
            videoUrl: 'https://www.youtube.com/watch?v=hfqotwc1gfk&t=24s',
            title: 'Reconcilers and Frontend frameworks',
            description: 'https://www.youtube.com/watch?v=hfqotwc1gfk&t=24s\n',
            videoSection: 'Frontend',
            links: [''],
            videoLength: 20,
        },
        {
            videoUrl: 'https://www.youtube.com/watch?v=hfqotwc1gfk&t=24s',
            title: 'Reconcilers and Frontend frameworks',
            description: 'https://www.youtube.com/watch?v=hfqotwc1gfk&t=24s\n',
            videoSection: 'Backend',
            links: [''],
            videoLength: 20,
        },
    ],
};
// const init = async () => {
//   //   let courseId = new mongoose.Types.ObjectId('65847b0f7abe6fbe59009a0f');
//   let courseId = '65847b0f7abe6fbe59009a0f';
//   console.log(courseId, 'id');
//   try {
//     const course = await CourseModel.findOneAndUpdate(
//       { _id: courseId },
//       {
//         // ratings: 1,
//         // price: 100,
//         $set: data,
//         // courseData: data.courseData,
//         // $set: data,
//       },
//       { new: true }
//     );
//     console.log(course, 'course');
//     const findCourse = await CourseModel.findOne({ _id: courseId });
//     console.log(findCourse, 'find course');
//   } catch (error) {
//     console.log(error, 'error in ');
//   }
// };
// create server
server.listen(process.env.PORT, () => {
    console.log(`Server is connected with port ${process.env.PORT}`);
    (0, db_1.default)();
    //   init();
});
