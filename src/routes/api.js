const express = require("express");
const TaskController = require("../controller/TaskController");
const UserController = require("../controller/UserController");
const AuthMiddleware = require("../middleware/AuthMiddleware");

const router = express.Router();

router.post("/registration", UserController.registration);
router.post("/login", UserController.login);

router.get("/verifyEmail/:email", UserController.verifyEmail);
router.get("/verifyOTP/:email/:otp ", UserController.verifyOTP);
router.get(
  "/passwordReset/:email/:otp/:password ",
  UserController.passwordReset
);

////after login
router.post("/profileUpdate", AuthMiddleware, UserController.profileUpdate);
router.get("/profileDetails", AuthMiddleware, UserController.profileDetails);

//////////////////////////

////task create, update, read, delete
//router.post("/task/create", AuthMiddleware, TaskController.create);
//router.post("/task/update", AuthMiddleware, TaskController.update);
//router.get("/task/read", AuthMiddleware, TaskController.read);
//router.get("/task/delete", AuthMiddleware, TaskController.delete);

module.exports = router;
