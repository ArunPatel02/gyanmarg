require('dotenv').config();
import mongoose, { Document, Model, Schema } from 'mongoose';

export interface IRepo extends Document {
  url: string;
  title: string;
  tags: string[];
}

const repositorySchema: Schema<IRepo> = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    url: {
      type: String,
      required: true,
    },
    tags: [{ type: String, trim: true }],
  },
  { timestamps: true }
);

const RepositoryModel: Model<IRepo> = mongoose.model(
  'Repository',
  repositorySchema
);

export default RepositoryModel;
