"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getDashboardInfo = exports.getOrderAnalytics = exports.getCoursesAnalytics = exports.getUsersAnalytics = void 0;
const ErrorHandler_1 = __importDefault(require("../utils/ErrorHandler"));
const catchAsyncErrors_1 = require("../middleware/catchAsyncErrors");
const analytics_generator_1 = require("../utils/analytics.generator");
const user_model_1 = __importDefault(require("../models/user.model"));
const course_model_1 = __importDefault(require("../models/course.model"));
const order_Model_1 = __importDefault(require("../models/order.Model"));
// get users analytics --- only for admin
exports.getUsersAnalytics = (0, catchAsyncErrors_1.CatchAsyncError)(async (req, res, next) => {
    try {
        const users = await (0, analytics_generator_1.generateLast12MothsData)(user_model_1.default);
        res.status(200).json({
            success: true,
            users,
        });
    }
    catch (error) {
        return next(new ErrorHandler_1.default(error.message, 500));
    }
});
// get courses analytics --- only for admin
exports.getCoursesAnalytics = (0, catchAsyncErrors_1.CatchAsyncError)(async (req, res, next) => {
    try {
        const courses = await (0, analytics_generator_1.generateLast12MothsData)(course_model_1.default);
        res.status(200).json({
            success: true,
            courses,
        });
    }
    catch (error) {
        return next(new ErrorHandler_1.default(error.message, 500));
    }
});
// get order analytics --- only for admin
exports.getOrderAnalytics = (0, catchAsyncErrors_1.CatchAsyncError)(async (req, res, next) => {
    try {
        const orders = await (0, analytics_generator_1.generateLast12MothsData)(order_Model_1.default);
        res.status(200).json({
            success: true,
            orders,
        });
    }
    catch (error) {
        return next(new ErrorHandler_1.default(error.message, 500));
    }
});
exports.getDashboardInfo = (0, catchAsyncErrors_1.CatchAsyncError)(async (req, res, next) => {
    try {
        // const users = await generateLast12MothsData(userModel);
        // const courses = await generateLast12MothsData(CourseModel);
        // const orders = await generateLast12MothsData(OrderModel);
        const total_user_count = await user_model_1.default.countDocuments();
        const total_course_count = await course_model_1.default.countDocuments();
        const today = new Date();
        today.setHours(0, 0, 0, 0);
        const today_sale_count = await course_model_1.default.countDocuments({
            createdAt: { $gte: today },
        });
        res.status(200).json({
            success: true,
            // users,
            // courses,
            // orders,
            total_user_count,
            total_course_count,
            today_sale_count,
        });
    }
    catch (error) {
        return next(new ErrorHandler_1.default(error.message, 500));
    }
});
