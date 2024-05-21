"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getRepositories = exports.removeRepository = exports.addRepository = void 0;
const catchAsyncErrors_1 = require("../middleware/catchAsyncErrors");
const ErrorHandler_1 = __importDefault(require("../utils/ErrorHandler"));
const repository_model_1 = __importDefault(require("../models/repository.model"));
// https://hackernoon.com/githubs-top-100-most-valuable-repositories-out-of-96-million-bb48caa9eb0b
exports.addRepository = (0, catchAsyncErrors_1.CatchAsyncError)(async (req, res, next) => {
    try {
        console.log(req.body);
        const { title, url, tags, } = req.body;
        await repository_model_1.default.create({ title, url, tags });
        res.status(200).json({
            success: true,
        });
    }
    catch (error) {
        return next(new ErrorHandler_1.default(error.message, 500));
    }
});
exports.removeRepository = (0, catchAsyncErrors_1.CatchAsyncError)(async (req, res, next) => {
    try {
        const id = req.params.id;
        console.log(id, 'id');
        await repository_model_1.default.findByIdAndDelete(id);
        res.status(200).json({
            success: true,
        });
    }
    catch (error) {
        return next(new ErrorHandler_1.default(error.message, 500));
    }
});
exports.getRepositories = (0, catchAsyncErrors_1.CatchAsyncError)(async (req, res, next) => {
    try {
        const repos = await repository_model_1.default.find({});
        res.status(200).json({
            success: true,
            repos,
        });
    }
    catch (error) {
        return next(new ErrorHandler_1.default(error.message, 500));
    }
});
