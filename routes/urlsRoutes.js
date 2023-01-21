const express = require("express");
const urlsController = require("../controllers/urlsController");
const authController = require("../controllers/authController");

const router = express.Router();

router
  .route("/:userId")
  .get(authController.protect, urlsController.getAllUrls)
  .post(authController.protect, urlsController.createUrls);

router
  .route("/:id")
  .get(authController.protect,urlsController.getUrls)
  .delete(urlsController.deleteUrl);

module.exports = router;
