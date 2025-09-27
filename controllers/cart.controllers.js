import {
    addProductToCart, 
    createCheckoutOrder, 
    removeProductFromCart,
    getCartByUserId
} from "../services/cart.services.js";
import {getUserId} from "../services/user.services.js";

export const addProductByIdToCart = async (req, res, next) => {
    try {
        const cart = await addProductToCart(getUserId(req), req.params);
        res.status(200).json(cart);
    } catch (err) {
        next(err);
    }
};

export const removeProductByIdFromCart = async (req, res, next) => {
    try {
        const cart = await removeProductFromCart(getUserId(req), req.params);
        res.status(200).json({items: cart.items});
    } catch (err) {
        next(err);
    }
};

export const checkoutOrder = async (req, res, next) => {
    try {
        const order = await createCheckoutOrder(getUserId(req));
        res.status(200).json(order);
    } catch (err) {
        next(err);
    }
};

export const fetchCart = async (req, res, next) => {
    try {
        const cart = await getCartByUserId(getUserId(req));
        res.status(200).json(cart)
    } catch (err) {
        next(err);
    };
};