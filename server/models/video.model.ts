import mongoose, { Document, Model, Schema } from 'mongoose';
import { IUser } from './user.model';

export interface IComment extends Document {
  user: IUser;
  question: string;
  questionReplies: IComment[];
}

interface ILink extends Document {
  title: string;
  url: string;
}

interface IVideo extends Document {
  title: string;
  description: string;
  videoUrl: string;
  videoThumbnail: object;
  videoSection: string;
  videoLength: number;
  videoPlayer: string;
  links: ILink[];
  suggestion: string;
  questions: IComment[];
  published: boolean;
}

const linkSchema = new Schema<ILink>({
  title: String,
  url: String,
});

const commentSchema = new Schema<IComment>(
  {
    user: Object,
    question: String,
    questionReplies: [Object],
  },
  { timestamps: true }
);

const VideoSchema = new Schema<IVideo>(
  {
    videoUrl: String,
    videoThumbnail: Object,
    title: String,
    videoSection: String,
    description: String,
    videoLength: Number,
    videoPlayer: String,
    links: [linkSchema],
    suggestion: String,
    questions: [commentSchema],
    published: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

const VideoModel: Model<IVideo> = mongoose.model('Video', VideoSchema);

export default VideoModel;
