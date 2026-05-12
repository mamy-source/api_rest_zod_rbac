import express from "express";

import { users, user, updateUserExisting, deleteUserExisting, role } from "../controllers/user.controller.js";
import { updateSchema, roleSchema } from "../validations/auth.validation.js";
import { validate } from "../middleware/validate.js";
import { allowRole } from "../middleware/rbac.js";
import { auth } from "../middleware/auth.js";

const userRouter = express.Router();
    
userRouter.get("/",auth, allowRole("admin"), users);
userRouter.get("/:id",auth, user);
userRouter.put("/:id",auth, validate(updateSchema), updateUserExisting);
userRouter.delete("/:id",auth, allowRole("admin"), deleteUserExisting);
userRouter.patch("/:id/role",auth, allowRole("admin"), validate(roleSchema), role);
export default userRouter;