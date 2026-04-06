const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/user.model.js");
const Blacklist = require("../models/blacklist.model.js");

/**
 * @route POST /api/auth/register
 * @description Register a new user, expects username, email and password in request body
 * @access Public
 */
const registerUserController = async (req, res) => {
  const { username, email, password } = req.body;

  // Check if all fields are provided
  if (!username || !email || !password) {
    return res.status(400).json({
      message: "All fields are required",
      success: false,
    });
  }

  // Check if user already exists with the same username or email
  const isUserAlreadyExists = await User.findOne({
    $or: [{ username }, { email }],
  });

  if (isUserAlreadyExists) {
    return res.status(400).json({
      message: "User already exists with this username or email",
      success: false,
    });
  }

  // Hash password
  const hashedPassword = await bcrypt.hash(password, 10);

  // Create new user if validation passes
  const newUser = await User.create({
    username,
    email,
    password: hashedPassword,
  });

  const token = jwt.sign(
    { id: newUser._id, username: newUser.username },
    process.env.JWT_SECRET,
    { expiresIn: "7d" },
  );

  // Set cookie
  res.cookie("token", token);

  return res.status(201).json({
    message: "User created successfully",
    success: true,
    user: {
      id: newUser._id,
      username: newUser.username,
      email: newUser.email,
    },
  });
};


/**
 * @route POST /api/auth/login
 * @description Login a user, expects email and password in request body
 * @access Public
 */
const loginUserController = async (req, res) => {
  const { email, password } = req.body;

  // Check if all fields are provided
  if (!email || !password) {
    return res.status(400).json({
      message: "All fields are required",
      success: false,
    });
  }

  // Check if user exists with the provided email
  const user = await User.findOne({ email: email.trim() });

  if (!user) {
    return res.status(400).json({
      message: "Invalid email or password",
      success: false,
    });
  }

  // Compare provided password with the hashed password in the database
  const isPasswordValid = await bcrypt.compare(password, user.password);

  if (!isPasswordValid) {
    return res.status(400).json({
      message: "Invalid email or password",
      success: false,
    });
  }

  const token = jwt.sign(
    { id: user._id, username: user.username },
    process.env.JWT_SECRET,
    { expiresIn: "7d" },
  );

  // Set cookie
  res.cookie("token", token);

  //   Return user data without password
  return res.status(200).json({
    message: "User logged in successfully",
    success: true,
    user: {
      id: user._id,
      username: user.username,
      email: user.email,
    },
  });
};


/**
 * @route GET /api/auth/get-me
 * @description Get user details who are currently logged in
 * @access Private
 */
const getMeController = async (req, res) => {
  const userId = req.user.id;

  const user = await User.findById(userId);

  res.status(200).json({
    message: "User details fetched successfully",
    success: true,
    user: {
      id: user._id,
      username: user.username,
      email: user.email,
    }
  });
};


/**
 * @route POST /api/auth/logout
 * @description Logout a user by clearing the token cookie and adding the token to blacklist
 * @access Public
 */
const logoutUserController = async (req, res) => {
  const token = req.cookies.token;

  if(token) {
    // Add token to blacklist
    await Blacklist.create({ token });
  };

  // Clear cookie
  res.clearCookie("token");

  return res.status(200).json({
    message: "User logged out successfully",
    success: true,
  });
}

module.exports = {
  registerUserController,
  loginUserController,
  getMeController,
  logoutUserController,
};
