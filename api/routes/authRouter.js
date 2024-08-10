import express from "express";
import {
  userSignUpController,
  userSigInController,
} from "../controllers/userController.js";

const router = express.Router();
//Sign Up Router || POST
router.post("/signup", userSignUpController);

//SignIn Router || POST
router.post("/signin", userSigInController);

export default router;
