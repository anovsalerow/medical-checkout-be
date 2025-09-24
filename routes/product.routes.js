import {Router} from "express";
import {isAuthorized} from "../middlewares/auth.middleware.js";
import {
    addProduct, 
    fetchProductById, 
    fetchAllProducts
} from "../controllers/product.controllers.js";
import {ROLES} from "../roles.js";

const router = Router();
const allRoles = Object.values(ROLES);

router.post('/', isAuthorized(allRoles), addProduct);
router.get('/all', isAuthorized(allRoles), fetchAllProducts);
router.get('/:productId', isAuthorized(allRoles), fetchProductById);

export default router;