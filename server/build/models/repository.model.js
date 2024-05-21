"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require('dotenv').config();
const mongoose_1 = __importDefault(require("mongoose"));
const repositorySchema = new mongoose_1.default.Schema({
    title: {
        type: String,
        required: true,
    },
    url: {
        type: String,
        required: true,
    },
    tags: [{ type: String, trim: true }],
}, { timestamps: true });
const RepositoryModel = mongoose_1.default.model('Repository', repositorySchema);
exports.default = RepositoryModel;
