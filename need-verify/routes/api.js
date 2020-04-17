const authController = require("../controllers/auth");
const express = require("express");

// eslint-disable-next-line new-cap
const apiRouter = module.exports = express.Router();

// eslint-disable-next-line new-cap
const authRoutes = express.Router();

// =========================
// Auth Routes
// =========================

// Create a new account
authRoutes.route("/register").post(authController.register);