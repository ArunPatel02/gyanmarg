import mongoose, { Document, Model, Schema } from 'mongoose';
import { IUser } from './user.model';
import SectionModel from './section.model';
import VideoModel from './video.model';

export interface IComment extends Document {
  user: IUser;
  question: string;
  questionReplies: IComment[];
}

interface IReview extends Document {
  user: IUser;
  rating?: number;
  comment: string;
  commentReplies?: IReview[];
}

interface ILink extends Document {
  title: string;
  url: string;
}

interface ISection extends Document {
  title: string;
  videos: {
    description: string;
    videoUrl: string;
    videoThumbnail: object;
    title: string;
    videoLength: number;
    videoPlayer: string;
    links: ILink[];
    suggestion: string;
    questions: IComment[];
  }[];
}

export interface ICourse extends Document {
  name: string;
  description: string;
  categories: string;
  // price: number;
  // estimatedPrice?: number;
  thumbnail: object;
  tags: string;
  level: string;
  demoUrl: string;
  benefits: { title: string }[];
  prerequisites: { title: string }[];
  reviews: IReview[];
  sections: ISection[];
  ratings?: number;
  purchased: number;
  published: boolean;
}

const reviewSchema = new Schema<IReview>(
  {
    user: Object,
    rating: {
      type: Number,
      default: 0,
    },
    comment: String,
    commentReplies: [Object],
  },
  { timestamps: true }
);

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

const courseDataSchema = new Schema<ISection>({
  title: String,
  videos: [
    {
      videoUrl: String,
      videoThumbnail: Object,
      title: String,
      description: String,
      videoLength: Number,
      videoPlayer: String,
      links: [linkSchema],
      suggestion: String,
      questions: [commentSchema],
    },
  ],
});

const courseSchema = new Schema<ICourse>(
  {
    name: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      // required: true,
    },
    categories: {
      type: String,
      // required: true,
    },
    // price: {
    //   type: Number,
    //   required: true,
    // },
    // estimatedPrice: {
    //   type: Number,
    // },
    thumbnail: {
      public_id: {
        type: String,
      },
      url: {
        type: String,
      },
    },
    tags: {
      type: String,
      // required: true,
    },
    level: {
      type: String,
      // required: true,
    },
    demoUrl: {
      type: String,
      // required: true,
    },
    benefits: [{ title: String }],
    prerequisites: [{ title: String }],
    reviews: [reviewSchema],
    // sections: [courseDataSchema],
    sections: [{ type: Schema.Types.ObjectId, required: true, ref: 'Section' }],
    ratings: {
      type: Number,
      default: 0,
    },
    purchased: {
      type: Number,
      default: 0,
    },
    published: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

const CourseModel: Model<ICourse> = mongoose.model('Course', courseSchema);

export default CourseModel;
