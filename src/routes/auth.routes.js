const { Router } = require("express");
const authController = require("../controllers/auth.controller.js");
const authMiddlwares = require("../middlewares/auth.middleware.js");

const authRouter = Router();

/**
 * @route POST /api/auth/register
 * @description Register a new user with username, email and password
 * @access Public
 */
authRouter.post("/register", authController.registerUserController);

/**
 * @route POST /api/auth/login
 * @description Login a user with email and password
 * @access Public
 */
authRouter.post("/login", authController.loginUserController);

/**
 * @route GET /api/auth/get-me
 * @description Get user details
 * @access Private
 */
authRouter.get(
  "/get-me",
  authMiddlwares.authUser,
  authController.getMeController,
);

/**
 * @route POST /api/auth/logout
 * @description Logout a user by clearing the token cookie and adding the token to blacklist
 * @access Public
 */
authRouter.get("/logout", authController.logoutUserController);

module.exports = authRouter;
