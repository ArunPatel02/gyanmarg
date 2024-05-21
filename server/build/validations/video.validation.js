"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.reorderVideos = exports.updateVideoDetail = void 0;
const zod_1 = __importDefault(require("zod"));
const updateVideoDetailSchema = zod_1.default
    .object({
    videoUrl: zod_1.default.string().optional(),
    videoThumbnail: zod_1.default.string().optional(),
    title: zod_1.default.string().optional(),
    description: zod_1.default.string().optional(),
    videoLength: zod_1.default.number().optional(),
    videoPlayer: zod_1.default.string().optional(),
    links: zod_1.default.array(zod_1.default.object({ title: zod_1.default.string(), url: zod_1.default.string() })).optional(),
    suggestion: zod_1.default.string().optional(),
    questions: zod_1.default.array(zod_1.default.string()).optional(),
    published: zod_1.default.boolean().optional(),
})
    .strict();
const updateVideoDetail = async (req, res, next) => {
    try {
        await updateVideoDetailSchema.parseAsync(req.body);
        next();
    }
    catch (err) {
        // console.log(err, 'eror');
        return res.status(400).send({
            //   error: err,
            message: err.issues[0].message,
        });
        // next(err);
    }
};
exports.updateVideoDetail = updateVideoDetail;
// reorder videos
const reorderVideosSchema = zod_1.default
    .object({
    videos: zod_1.default.array(zod_1.default.string()),
})
    .strict();
const reorderVideos = async (req, res, next) => {
    try {
        console.log(req.body);
        await reorderVideosSchema.parseAsync(req.body);
        next();
    }
    catch (err) {
        // console.log(err, 'eror');
        return res.status(400).send({
            //   error: err,
            message: err.issues[0].message,
        });
        // next(err);
    }
};
exports.reorderVideos = reorderVideos;
