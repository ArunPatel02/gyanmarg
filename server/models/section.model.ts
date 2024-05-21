import mongoose, { Document, Model, Schema } from 'mongoose';
import VideoModel from './video.model';

export interface ISection extends Document {
  title: string;
  videos: string[];
  published: boolean;
}

const SectionSchema = new Schema<ISection>(
  {
    title: { type: String, required: true },
    videos: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Video' }],
    published: { type: Boolean, default: false },
  },
  { timestamps: true }
);

const SectionModel: Model<ISection> = mongoose.model('Section', SectionSchema);

export default SectionModel;
