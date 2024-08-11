import { errorHandler } from "../utils/error.js";
import { jwt } from "jsonwebtoken";

export const verifyUser = async (req, res, next) => {
  try {
    const getToken = req.cookies.access_token;
    console.log(getToken);

    if (!getToken) return next(errorHandler(401, "You are not authenticated"));
    jwt.verify(getToken, process.env.JWT_SECRET, (err, user) => {
      if (err) return next(errorHandler(401, "Token is not valid"));
    });
    req.user = user;
    next();
  } catch (error) {
    next(error);
  }
};
