import {Router} from 'express';
import {isAuthorized} from "../middlewares/auth.middleware.js";
import {
    addProductByIdToCart, 
    checkoutOrder, 
    removeProductByIdFromCart,
    fetchCart,
    saveOrder,
    addDemoProducts
} from "../controllers/cart.controllers.js";
import {ROLES} from "../roles.js";

const router = Router();
const allRoles = Object.values(ROLES);

router.put('/orders', isAuthorized(allRoles), saveOrder);
router.put('/demo', isAuthorized(allRoles), addDemoProducts);
router.put('/:productId', isAuthorized(allRoles), addProductByIdToCart);
router.delete('/:productId', isAuthorized(allRoles), removeProductByIdFromCart);
router.post('/checkout', isAuthorized(allRoles), checkoutOrder);
router.get('/', isAuthorized(allRoles), fetchCart);

export default router;