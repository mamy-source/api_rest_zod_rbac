import express from "express";
import { register, login, refreshToken, profile } from "../controllers/auth.controller.js";
import { registerSchema, loginSchema } from "../validations/auth.validation.js";
import { validate } from "../middleware/validate.js";
import { auth } from "../middleware/auth.js";


const authRouter =  express.Router();

authRouter.post("/register", validate(registerSchema), register);
authRouter.post("/login", validate(loginSchema), login);
authRouter.get("/profile",auth, profile);
authRouter.post("/refresh-token", refreshToken);

export default authRouter;