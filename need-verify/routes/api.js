const authController = require("../controllers/auth");
const diplomaController = require("../controllers/diploma");
const express = require("express");

// eslint-disable-next-line new-cap
const apiRouter = module.exports = express.Router();

apiRouter.route("/diploma/:user_id")
    .get(diplomaController.getAllDiplomasByUserId);

// eslint-disable-next-line new-cap
const authRoutes = express.Router();

// =========================
// Auth Routes
// =========================

// Create a new account
authRoutes.route("/accounts").post(authController.register);