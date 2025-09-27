import {Cart} from "../models/cart.js";
import {Order} from "../models/order.js";

export const createCart = async (userId) => {
    return new Cart({
        userId,
        items: []
    }).save();
};

export const getProductsFromCartByUserId = async (userId) => {
    return Cart.findOne({userId}).populate('items.productId', '_id title price color formFactor');
};

export const findCartByUserIdAndUpdate = async (userId, newData, {arrayFilters}) => {
    const options = {
        new: true,
        upsert: true,
        arrayFilters
    }
    return Cart.findOneAndUpdate(
        {userId},
        newData,
        options
    ).populate('items.productId', '_id title price color formFactor');
};

export const findOrderByUserIdAndUpdate = async (userId, newData) => {
    const options = {
        new: true,
        upsert: true
    }

    return Order.findOneAndUpdate(
        {userId},
        newData,
        options
    )
        .populate('userId', '_id email');
};

export const findCartByUserId = async (userId) => {
    return Cart.findOne({userId});
};