const express = require("express");
const {
  registerUser,
  sendOTP,
  verifyEmailOTP,
  verifyPhoneOTP,
  loginUser,
  forgotPassword,
  verifyOtpAndResetPassword,
  updateUser,
  getAllUsers,
  deleteUser,
  // getCandidateDetails,
  // saveCandidate,
  logout,

} = require("../controller/empoyerController");

const { isAuthenticatedUser } = require("../middlewares/auth");
const upload = require("../utils/multer");


const router = express.Router();
router.route("/employee/signup").post(registerUser);
router.route("/send-otp").post(sendOTP)
router.route("/verify-email-otp").post(verifyEmailOTP);
router.route("/verify-phone-otp").post(verifyPhoneOTP);
router.route("/employee/login").post(loginUser);
router.route("/logout").get(logout);
router.route("/password/forgot").post(forgotPassword);
router.route("/password/reset").put(verifyOtpAndResetPassword);
router.route("/users/:id").put(isAuthenticatedUser, upload.single("userProfile"), updateUser)
router.route("/users/:id").delete(isAuthenticatedUser, deleteUser);

//all employee
router.get("/admin/users", getAllUsers);



module.exports = router;