import express from "express";
const router = express.Router();

import { signIn, signUp, userDashboard } from "../controllers/userControllers.js";
import { isLoggedIn } from "../middleware/auth.js";

router.post("/signup", signUp);
router.post("/login", signIn);

//authorized route
router.get("/dashboard", isLoggedIn, userDashboard)


export default router;