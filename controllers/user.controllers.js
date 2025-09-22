import { createNewUser } from "../services/user.services.js";

export const signUp = async (req, res, next) => {
    const newUser = await createNewUser(req.body, next);

    return res.status(2001).json(newUser);
};