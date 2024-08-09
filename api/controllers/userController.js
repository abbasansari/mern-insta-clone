import jwt from "jsonwebtoken";
import { userModel } from "../models/userModel.js";
import bcrypt from "bcryptjs";

//signUp Controller
export const userSignUpController = async (req, res) => {
  const { username, email, password } = req.body;
  console.log(username, email, password);
  try {
    //validation
    if (!username || !email || !password)
      return res
        .status(400)
        .json({ success: false, message: "Please fill all the fields" });

    const userExist = await userModel.findOne({ email });
    if (userExist)
      return res
        .status(400)
        .json({ success: false, message: "User already exist" });

    //hashing password
    const hashedPassword = bcrypt.hashSync(password, 10);
    //registering new user
    const newUser = await new userModel({
      email,
      username,
      password: hashedPassword,
    });
    await newUser.save();

    return res
      .status(201)
      .json({ success: true, message: "New user created", newUser });
  } catch (error) {
    console.log(error);
  }
};

//sigin Controller

const sigInController = async (req, res) => {
  const { email, password } = req.body;
  console.log(email, password);
  try {
    if (!email || !password)
      return res
        .status(401)
        .json({ success: false, message: "All fields are required" });

    const user = await userModel.findOne({ email });
    if (!user)
      return res
        .status(401)
        .json({ success: false, message: "User does not exist" });

    const isMatched = bcrypt.compareSync(password, user.password);
    if (!isMatched)
      return res
        .status(401)
        .json({ success: false, message: "Invalid credentials" });

    //generating token
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
    //seprating pass from response to ui
    const { password: pass, ...rest } = user._doc;
    return res
      .status(200)
      .cookie("access_token", token, {
        httpOnly: true,
      })
      .json(rest);
  } catch (error) {
    console.log(error);
  }
};
