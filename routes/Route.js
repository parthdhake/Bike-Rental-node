const express = require("express");
const router = express.Router();

const controller = require("../controllers/controller");
const userAuthControllers = require("../controllers/userAuthController");

const passport = require("passport");

const { verifyUser } = require("../authenticate");

router.post("/signup", userAuthControllers.userSignup);

router.post(
  "/login",
  passport.authenticate("local"),
  userAuthControllers.userLogin
);

router.post("/refreshToken", userAuthControllers.refreshToken);

router.get("/logout", verifyUser, userAuthControllers.userLogout);

router.get("/me", verifyUser, (req, res, next) => {
  res.send(req.user);
});

router.get("/bikes", controller.bikesDetails);
router.get("/bikes/:id", controller.singlebike);

router.get("/rentabike", verifyUser, controller.rentBike);

module.exports = router;
