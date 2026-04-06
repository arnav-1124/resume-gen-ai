const express = require("express");
const morgan = require("morgan");
const cookieParser = require("cookie-parser");

const app = express();

// Requiring routes
const authRouter = require("./routes/auth.routes.js");

// Middlewares
app.use(express.json());
app.use(morgan("dev"));
app.use(cookieParser());

// Prefixing routes
app.use("/api/auth", authRouter);

module.exports = app;
