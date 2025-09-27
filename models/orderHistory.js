import mongoose from "mongoose";

const Schema = mongoose.Schema;

const orderItemsSchema = new Schema({
    productId: {
        type: Schema.Types.ObjectId,
        ref: "Product",
        required: true
    },
    quantity: {
        type: Number,
        default: 1
    }
});

const orderHistorySchema = new Schema({
    userId: {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    items: [orderItemsSchema]
});

export const OrderHistory = mongoose.model('OrderHistory', orderHistorySchema);