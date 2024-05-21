"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.embedSection = exports.updateSection = exports.addSection = void 0;
const catchAsyncErrors_1 = require("../middleware/catchAsyncErrors");
const ErrorHandler_1 = __importDefault(require("../utils/ErrorHandler"));
const section_model_1 = __importDefault(require("../models/section.model"));
const messages_1 = __importDefault(require("../constants/messages"));
const course_model_1 = __importDefault(require("../models/course.model"));
// add section
// export const addSection = CatchAsyncError(
//   async (req: Request, res: Response, next: NextFunction) => {
//     try {
//       const data = req.body;
//       const section = await SectionModel.create(data);
//       return res.status(200).send({
//         message: messages.section_added,
//         data: section,
//       });
//     } catch (error: any) {
//       return next(new ErrorHandler(error.message, 400));
//     }
//   }
// );
exports.addSection = (0, catchAsyncErrors_1.CatchAsyncError)(async (req, res, next) => {
    try {
        const { id: courseId } = req.params;
        const data = req.body;
        const course = await section_model_1.default.create(data);
        await course_model_1.default.updateOne({ _id: courseId }, { $push: { sections: course._id } });
        res.status(201).json({
            success: true,
            data: course,
            input: req.body,
        });
    }
    catch (error) {
        return next(new ErrorHandler_1.default(error.message, 500));
    }
});
// update section details
exports.updateSection = (0, catchAsyncErrors_1.CatchAsyncError)(async (req, res, next) => {
    try {
        const { sectionId } = req.params;
        const data = req.body;
        const section = await section_model_1.default.updateOne({ _id: sectionId }, data);
        return res.status(200).send({
            message: messages_1.default.section_added,
            data: section,
        });
    }
    catch (error) {
        return next(new ErrorHandler_1.default(error.message, 500));
    }
});
exports.embedSection = (0, catchAsyncErrors_1.CatchAsyncError)(async (req, res, next) => {
    try {
        const { id: courseId } = req.params;
        const { sectionId } = req.body;
        const section = await section_model_1.default.findById(sectionId);
        if (!section) {
            return res.status(404).json({
                message: 'Section not found',
            });
        }
        await course_model_1.default.updateOne({ _id: courseId }, { $push: { sections: section._id } });
        res.status(201).json({
            success: true,
            input: req.body,
        });
    }
    catch (error) {
        return next(new ErrorHandler_1.default(error.message, 500));
    }
});
