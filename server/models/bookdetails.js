import mongoose from "mongoose";
const BookDetailsSchema = new mongoose.Schema({
  Name: String,
  Price: Number,
  cover: String,
  Author:String,
  Owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'LoginDetails'
  }
});
export const BookDetails = mongoose.model('BookDetails', BookDetailsSchema);
