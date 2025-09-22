import { createNewUser } from "../services/user.services.js";

export const signUp = async (req, res) => {
    const newUser = await createNewUser(req.body);

    return res.status(201).json(newUser);
};