import { ErrorReadWriteFile } from "../middlewares/errorHandler.js";
import { addAndSaveNewProduct, getProductById } from "../repositories/product.repositories.js";

export const createNewProduct = async (data) => {
    const newProduct = {
        title: data.title,
        description: data.description,
        price: data.price,
        color: data.color,
        formFactor: data.formFactor
    }
    try {
        return await addAndSaveNewProduct(newProduct);
    } catch (err){
        throw new ErrorReadWriteFile(err);
    }
};

export const findProductById = async ({productId}) => {
    const product = await getProductById(productId);
    if (!product) {
        throw new ErrorObjectNotFound("product not found");
    }
    return product;
};