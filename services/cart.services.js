import {getProductById} from "../repositories/product.repositories.js";
import {ErrorObjectNotFound} from "../middlewares/errorHandler.js";
import {getUser} from "../repositories/user.repositories.js";
import {
    findCartByUserIdAndUpdate,
    findOrderByUserIdAndUpdate,
    getProductsFromCartByUserId,
    findCartByUserId
} from "../repositories/cart.repositories.js";

export const addProductToCart = async (userId, {productId}) => {
    const foundProductById = await getProductById(productId);
    if (!foundProductById) {
        throw new ErrorObjectNotFound("Product not found");
    }

    const currentUser = await getUser(userId);
    if (!currentUser) {
        throw new ErrorObjectNotFound("User not found");
    }
    const cart = await findCartByUserId(currentUser._id);
    const existingItem = cart?.items.find(
        (item) => item.productId.toString() === foundProductById._id.toString()
    );
    if (existingItem) {
        return await findCartByUserIdAndUpdate(
            currentUser._id,
            {$inc: {"items.$[elem].quantity": 1}},
            {arrayFilters: [{"elem.productId": foundProductById._id}]}
        );
    } else {
        return await findCartByUserIdAndUpdate(
            currentUser._id,
            {$push: {items: {productId: foundProductById._id}}},
            {arrayFilters: []}
        );
    };
    
};

export const removeProductFromCart = async (userId, {productId}) => {
    const currentUser = await getUser(userId);
    if (!currentUser) {
        throw new ErrorObjectNotFound("User not found");
    }
    return await findCartByUserIdAndUpdate(
        currentUser._id,
        {$pull: {items: {productId: productId}}},
        {arrayFilters: []}
    );
};

export const createCheckoutOrder = async (userId) => {
    const currentUser = await getUser(userId);
    if (!currentUser) {
        throw new ErrorObjectNotFound("User not found");
    }
    const cart = await getProductsFromCartByUserId(currentUser._id);
    if (!cart) {
        throw new ErrorObjectNotFound('Cart not found');
    }
    const products = cart.items.map((item) => {
        const product = item.productId;
        return {
        productId: product._id,
        title: product.title,
        price: product.price,
        quantity: item.quantity
        };
    });

    const totalPrice = products.reduce((sum, product) => {
        return sum + product.price * product.quantity;
    }, 0);

    return await findOrderByUserIdAndUpdate(
        currentUser.id,
        {
        products,
        totalPrice
        }
    );
};