import {
    addProductToCart, 
    createCheckoutOrder, 
    removeProductFromCart,
    getCartByUserId,
    addNewOrder
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

export const saveOrder = async(req, res, next) => {
    try {
        const userId = getUserId(req);
        const order = await addNewOrder(userId) ;
        const result = {
            objectId: order._id,
            message: 'The order has been accepted'
        }
        res.status(200).json(result);
    } catch (err) {
        next(err);
    };
};

export const addDemoProducts = async (req, res, nest) => {
    try {
        const demoProductId = [
            {productId: '68d419e9f23e9462ee0212b3'},
            {productId: '68d41a62f23e9462ee0212b5'},
            {productId: '68d41a81f23e9462ee0212b7'},
            {productId: '68d41abcf23e9462ee0212b9'},
            {productId: '68d41ae6f23e9462ee0212bb'}
        ];
        demoProductId.map(async (productId) => {
            await addProductToCart(getUserId(req), productId);
        });
        res.status(200).send('Ok');
    } catch (err) {
        next(err);
    };
};