import express from "express";
import path from "path";
import cors from "cors";
import authRouter from "./routes/auth.route.js";
import { limiter } from "./middleware/rateLimit.js";
import userRouter from "./routes/user.route.js";
import cookieParser from "cookie-parser";
import taskRoutes from "./routes/task.route.js";



const app = express();

app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(cookieParser());

//static files
app.use(express.static(path.join(process.cwd(), "public")));

//view engine
app.set("view engine", "ejs");
app.set("views", path.join(process.cwd(), "views"));

//cors allow origin
app.use(cors({
    origin: ["http://localhost:3000"], //pour le frontend
    methods: ["GET", "PUT", "POST", "DELETE"],
    credentials: true
}));

//routes auth
app.use("/auth",limiter, authRouter);

//routes user
app.use("/users", userRouter);

//tasks routes
app.use('/tasks', taskRoutes);


export default app;