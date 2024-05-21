"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const auth_1 = require("../middleware/auth");
const repository_controller_1 = require("../controllers/repository.controller");
const repositoryRouter = express_1.default.Router();
repositoryRouter.post('/repository', auth_1.isAutheticated, (0, auth_1.authorizeRoles)('admin'), repository_controller_1.addRepository);
repositoryRouter.delete('/repository/:id', auth_1.isAutheticated, (0, auth_1.authorizeRoles)('admin'), repository_controller_1.removeRepository);
repositoryRouter.get('/repositories', repository_controller_1.getRepositories);
exports.default = repositoryRouter;
