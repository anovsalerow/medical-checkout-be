import {createNewProduct, findProductById} from "../services/product.services.js";
import {ErrorReadWriteFile} from "../middlewares/errorHandler.js";
import {getProducts} from "../repositories/product.repositories.js";

export const addProduct = async (req, res, next) => {
    try {
        const newProduct = await createNewProduct(req.body);
        res.status(201).json(newProduct);
    } catch (err) {
        next(new ErrorReadWriteFile(err));
    }
};

export const fetchAllProducts = async (req, res) => {
    const allProducts = await getProducts();
    res.status(200).json(allProducts);
};

export const fetchProductById = async (req, res, next) => {
    try {
        const foundProductById = await findProductById(req.params);
        res.status(200).json(foundProductById);
    } catch (err) {
        next(err);
    }
};