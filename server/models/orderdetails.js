import mongoose from "mongoose";
const OrderDetailsSchema = new mongoose.Schema({
    Buyer: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'LoginDetails'
    },
    Name: String,
    Price: Number,
    cover: String,
    Author: String,
    Seller: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'LoginDetails'
    }
});
export const OrderDetails = mongoose.model('OrderDetails', OrderDetailsSchema);