import mongoose, { Document, Model, Schema } from 'mongoose';

export interface IVideoSection extends Document {
  title: string;
  videos: string[];
}

const videoSectionSchema = new Schema<IVideoSection>(
  {
    title: { type: String, required: true },
    videos: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Video' }],
  },
  { timestamps: true }
);

const VideoSectionModel: Model<IVideoSection> = mongoose.model('VideoSection', videoSectionSchema);

export default VideoSectionModel;
