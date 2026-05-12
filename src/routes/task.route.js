import express from "express";
import { tasks, task,createNew, update, deleteExisting } from "../controllers/task.controller.js";
import { auth } from "../middleware/auth.js";
import { validate } from "../middleware/validate.js";
import { createTaskSchema, updateTaskSchema} from "../validations/task.validation.js";

const taskRoutes = express.Router();

taskRoutes.post("/create", auth, validate(createTaskSchema), createNew );
taskRoutes.get("/", auth, tasks);
taskRoutes.get("/:id", auth, task);
taskRoutes.put("/:id", auth, validate(updateTaskSchema), update);
taskRoutes.delete("/:id", auth, deleteExisting);


export default taskRoutes;




