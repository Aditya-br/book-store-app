import mongoose from "mongoose";
const LoginDetailsSchema = new mongoose.Schema({
    firstName: String,
    lastName: String,
    password: String,
    profit: Number
});
export const LoginDetails = mongoose.model('LoginDetails', LoginDetailsSchema);
