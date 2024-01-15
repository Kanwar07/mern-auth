import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/APIError.js";
import { ApiResponse } from "../utils/APIResponse.js";
import { User } from "../models/user.model.js";
import jwt from "jsonwebtoken";

const generateToken = async (userId) => {
  try {
    const user = await User.findById(userId);
    const token = user.generateToken();

    await user.save({ ValidateBeforeSave: false });

    return token;
  } catch (error) {
    throw new ApiError(500, "Something went wrong while genrating Access");
  }
};

const registerUser = asyncHandler(async (req, res) => {
  const { name, username, email, password, confirmpassword } = req.body;
  if (
    [name, username, email, password, confirmpassword].some(
      (field) => field?.trim() === ""
    )
  ) {
    return res.json({
      statusCode: 400,
      error: "All fields are required",
    });
  }

  if (password !== confirmpassword) {
    return res.json({
      statusCode: 400,
      error: "Password do not match",
    });
  }

  if (password.length < 6) {
    return res.json({
      statusCode: 400,
      error: "Passwort must be more than 6 characters",
    });
  }

  const existedUser = await User.findOne({
    $or: [{ username }, { email }],
  });

  if (existedUser) {
    return res.json({
      statusCode: 409,
      error: "User or email already exist",
    });
  }

  const user = await User.create({
    name,
    username: username.toLowerCase(),
    email,
    password,
    confirmpassword,
  });

  const createdUser = await User.findById(user._id).select("-password");

  if (!createdUser) {
    return res.json({
      statusCode: 500,
      error: "Something went wrong",
    });
  }

  return res
    .status(201)
    .json(new ApiResponse(200, createdUser, "User registered successfully"));
});

const loginUser = asyncHandler(async (req, res) => {
  const { username, password } = req.body;
  if (!username) {
    res.json({
      statusCode: 400,
      error: "Username is required",
    });
  }

  const user = await User.findOne({ username });

  if (!user) {
    res.json({
      statusCode: 404,
      error: "Username does not exist",
    });
  }

  const token = await generateToken(user._id);

  const isPasswordValid = await user.isPasswordCorrect(password);

  if (!isPasswordValid) {
    res.json({
      statusCode: 401,
      error: "Password is incorrect",
    });
  }

  const loggedInUser = await User.findById(user._id).select(
    "-password -confirmpassword"
  );

  const options = {
    httpOnly: true,
    secure: true,
  };

  res
    .status(200)
    .cookie("token", token, options)
    .json(
      new ApiResponse(
        200,
        { user: loggedInUser, token },
        "Logged in Successfully"
      )
    );
});

const getProfile = asyncHandler(async (req, res) => {
  const { token } = req.cookies;
  if (token) {
    jwt.verify(token, process.env.TOKEN_SECRET, {}, (err, user) => {
      if (err) throw new ApiError(401, "Unauthorized request");
      res.json(user);
    });
  } else {
    res.json(null);
  }
});

export { registerUser, loginUser, getProfile };
