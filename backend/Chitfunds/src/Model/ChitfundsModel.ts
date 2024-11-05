import mongoose from "mongoose";

const ChitfundsSchema = new mongoose.Schema({
    name: String,
    totalAmount:Number,
    maxParticipants:Number,
    duration:Number,
    startDate:Date,
    CreatorID:Number,
    Participants:[Number]

})
export const Chitfunds = mongoose.model('Chitfunds', ChitfundsSchema);