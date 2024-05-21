import express from 'express';
import { authorizeRoles, isAutheticated } from '../middleware/auth';
import {
  addRepository,
  getRepositories,
  removeRepository,
} from '../controllers/repository.controller';
const repositoryRouter = express.Router();

repositoryRouter.post(
  '/repository',
  isAutheticated,
  authorizeRoles('admin'),
  addRepository
);

repositoryRouter.delete(
  '/repository/:id',
  isAutheticated,
  authorizeRoles('admin'),
  removeRepository
);

repositoryRouter.get('/repositories', getRepositories);

export default repositoryRouter;
