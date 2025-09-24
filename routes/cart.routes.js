import {Router} from 'express';
import {isAuthorized} from "../middlewares/auth.middleware.js";
import {addProductByIdToCart, checkoutOrder, removeProductByIdFromCart} from "../controllers/cart.controllers.js";
import {ROLES} from "../roles.js";

const router = Router();
const allRoles = Object.values(ROLES);

router.put('/:productId', isAuthorized(allRoles), addProductByIdToCart);
router.delete('/:productId', isAuthorized(allRoles), removeProductByIdFromCart);
router.post('/checkout', isAuthorized(allRoles), checkoutOrder);

export default router;