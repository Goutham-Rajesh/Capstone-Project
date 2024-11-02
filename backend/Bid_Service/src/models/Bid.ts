import mongoose, { Document, Schema } from 'mongoose';

export interface IBid extends Document {
//  BidID: string;
  ChitFundID: string;
  UserID: string;
  BidAmount: number;
  BidDate: Date;
}

const BidSchema: Schema = new Schema({
 // BidID: { type: String, required: true, unique: true },
  ChitFundID: { type: String, required: true },
  UserID: { type: String, required: true },
  BidAmount: { type: Number, required: true },
  BidDate: { type: Date, default: Date.now },
  
});

export const Bid = mongoose.model<IBid>('Bid', BidSchema);
