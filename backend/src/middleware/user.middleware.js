import jwt from "jsonwebtoken";
import { asyncHandler } from "../utils/asyncHandler";
import { User } from "../models/user.model";

export const jwtVerify = asyncHandler(async (req, res, next) => {
  try {
    const token =
      req.cookie?.token || req.header("Authorization")?.replace("Bearer ", "");

    if (!token) {
      return res.json({
        statusCode: 401,
        error: "Invalid Access Token",
      });
    }

    const decodedToken = jwt.verify(token, process.env.TOKEN_SECRET);

    const user = await User.findById(decodedToken?._id).select("-password");

    if (!user) {
      return res.json({
        statusCode: 401,
        error: "Invalid Access Token",
      });
    }

    req.user = user;
    next();
  } catch (error) {
    return res.json({
      statusCode: 401,
      error: error?.message || "Invalid Access Token",
    });
  }
});
