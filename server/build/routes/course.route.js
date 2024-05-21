"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const course_controller_1 = require("../controllers/course.controller");
const auth_1 = require("../middleware/auth");
const validation = __importStar(require("../validations/course.validation"));
const courseRouter = express_1.default.Router();
courseRouter.post('/create-course', auth_1.isAutheticated, (0, auth_1.authorizeRoles)('admin'), validation.createCourse, course_controller_1.uploadCourse);
courseRouter.put('/edit-course/:id', auth_1.isAutheticated, (0, auth_1.authorizeRoles)('admin'), 
// validation.createCourse,
course_controller_1.editCourse);
courseRouter.get('/get-course/:id', course_controller_1.getSingleCourse);
courseRouter.get('/get-courses', course_controller_1.getAllCourses);
courseRouter.get('/get-admin-courses', auth_1.isAutheticated, (0, auth_1.authorizeRoles)('admin'), course_controller_1.getAdminAllCourses);
courseRouter.get('/get-course-content/:id', auth_1.isAutheticated, course_controller_1.getCourseByUser);
courseRouter.put('/add-question', auth_1.isAutheticated, course_controller_1.addQuestion);
courseRouter.put('/add-answer', auth_1.isAutheticated, course_controller_1.addAnwser);
courseRouter.put('/add-review/:id', auth_1.isAutheticated, course_controller_1.addReview);
courseRouter.put('/add-reply', auth_1.isAutheticated, (0, auth_1.authorizeRoles)('admin'), course_controller_1.addReplyToReview);
courseRouter.post('/getVdoCipherOTP', course_controller_1.generateVideoUrl);
courseRouter.delete('/delete-course/:id', auth_1.isAutheticated, (0, auth_1.authorizeRoles)('admin'), course_controller_1.deleteCourse);
exports.default = courseRouter;
