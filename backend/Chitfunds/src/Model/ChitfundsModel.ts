import mongoose from "mongoose";

const ChitfundsSchema = new mongoose.Schema({
    name: String,
    totalAmount:Number,
    duration:String,
    startDate:Date,
    EndDate:Date,
    CreatorID:Number,
    Participants:[Number]
});

export const Chitfunds = mongoose.model('Chitfunds', ChitfundsSchema);