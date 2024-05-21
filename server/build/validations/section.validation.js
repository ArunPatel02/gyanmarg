"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.addSection = void 0;
const zod_1 = __importDefault(require("zod"));
const addSectionSchema = zod_1.default
    .object({
    title: zod_1.default.string(),
})
    .strict();
const addSection = async (req, res, next) => {
    try {
        await addSectionSchema.parseAsync(req.body);
        next();
    }
    catch (err) {
        console.log(err, 'eror');
        return res.status(400).send({
            message: err.issues[0].message,
        });
    }
};
exports.addSection = addSection;
