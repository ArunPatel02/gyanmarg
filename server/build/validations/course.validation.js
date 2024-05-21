"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createCourse = void 0;
const zod_1 = __importDefault(require("zod"));
const createCourseSchema = zod_1.default.object({
    name: zod_1.default.string(),
    description: zod_1.default.string(),
    tags: zod_1.default.string(),
    level: zod_1.default.string(),
    categories: zod_1.default.string(),
    demoUrl: zod_1.default.string(),
    thumbnail: zod_1.default.string(),
    benefits: zod_1.default.array(zod_1.default.object({ title: zod_1.default.string() })),
    prerequisites: zod_1.default.array(zod_1.default.object({ title: zod_1.default.string() })),
});
const createCourse = async (req, res, next) => {
    try {
        await createCourseSchema.parseAsync(req.body);
        next();
    }
    catch (err) {
        next(err);
    }
};
exports.createCourse = createCourse;
// type CreateCourseType = z.infer<typeof>
