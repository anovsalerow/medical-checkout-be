import mongoose from "mongoose";

const Schema = mongoose.Schema;

const productSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String
    },
    price: {
        type: Number,
        required: true
    },
    color: {
        type: String
    },
    formFactor: {
        type: String
    }
});

export const Product = mongoose.model('Product', productSchema);