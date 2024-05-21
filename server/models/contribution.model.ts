import mongoose, { Document, Model, Schema } from 'mongoose';

export interface IContribution extends Document {
  type: '';
  text: string;
}

const contributionSchema = new Schema<IContribution>(
  {
    type: { type: String, required: true },
    text: { type: String, required: true },
  },
  { timestamps: true }
);

const ContributionModel: Model<IContribution> = mongoose.model(
  'VideoSection',
  contributionSchema
);

export default ContributionModel;
