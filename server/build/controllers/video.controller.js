"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteVideo = exports.reorderVideos = exports.addVideo = exports.updateVideoDetail = exports.getVideo = void 0;
const catchAsyncErrors_1 = require("../middleware/catchAsyncErrors");
const ErrorHandler_1 = __importDefault(require("../utils/ErrorHandler"));
const video_model_1 = __importDefault(require("../models/video.model"));
const section_model_1 = __importDefault(require("../models/section.model"));
exports.getVideo = (0, catchAsyncErrors_1.CatchAsyncError)(async (req, res, next) => {
    try {
        const { videoId } = req.params;
        const data = await video_model_1.default.findById(videoId);
        return res.status(200).json({
            message: 'Video fetched successfully',
            data,
        });
    }
    catch (error) {
        return next(new ErrorHandler_1.default(error.message, 400));
    }
});
exports.updateVideoDetail = (0, catchAsyncErrors_1.CatchAsyncError)(async (req, res, next) => {
    try {
        const { videoId } = req.params;
        const data = await video_model_1.default.updateOne({ _id: videoId }, req.body);
        return res.status(200).json({
            message: 'Successfully video updated',
            data,
        });
    }
    catch (error) {
        return next(new ErrorHandler_1.default(error.message, 400));
    }
});
exports.addVideo = (0, catchAsyncErrors_1.CatchAsyncError)(async (req, res, next) => {
    try {
        const { id: sectionId } = req.params;
        const data = req.body;
        const course = await video_model_1.default.create(data);
        await section_model_1.default.updateOne({ _id: sectionId }, { $push: { videos: course._id } });
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
exports.reorderVideos = (0, catchAsyncErrors_1.CatchAsyncError)(async (req, res, next) => {
    try {
        const { sectionId } = req.params;
        const { videos } = req.body;
        await section_model_1.default.updateOne({ _id: sectionId }, { $set: { videos } });
        res.status(201).json({
            success: true,
            input: req.body,
        });
    }
    catch (error) {
        return next(new ErrorHandler_1.default(error.message, 500));
    }
});
exports.deleteVideo = (0, catchAsyncErrors_1.CatchAsyncError)(async (req, res, next) => {
    try {
        const { videoId } = req.params;
        const video = await video_model_1.default.deleteOne({ _id: videoId });
        console.log(video, 'video');
        await section_model_1.default.updateMany({ videos: videoId }, { $pull: { videos: videoId } });
        res.status(201).json({
            success: true,
            input: req.body,
        });
    }
    catch (error) {
        return next(new ErrorHandler_1.default(error.message, 500));
    }
});
