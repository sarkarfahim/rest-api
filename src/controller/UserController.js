const UsersModel = require("../model/UsersModel");
const jwt = require("jsonwebtoken");

const SendEmailUtility = require("../utility/EmailSend");
const OTPModel = require("../model/OTPModel");
//////////////////////////////////////

exports.registration = async (req, res) => {
  try {
    const reqBody = req.body;

    await UsersModel.create(reqBody);
    res.json({ status: "success", message: "Registration Completed" });
  } catch (error) {
    res.json({ status: "fail", message: error });
  }
};

////////////////////////////////////////////////

exports.login = async (req, res) => {
  try {
    let reqBody = req.body;

    const user = await UsersModel.find(reqBody);

    if (user.length > 0) {
      // jwt token
      let playload = {
        exp: Math.floor(Date.now() / 1000) + 24 * 60 * 60,
        data: reqBody["email"],
      };

      let token = jwt.sign(playload, "123-xxy");
      res.json({ status: "sucess", message: "user found", token: token });
    } else {
      res.json({ status: "fail", message: "userLOgin fail" });
    }
  } catch (error) {
    res.json({ status: "fail", message: error });
  }
};

/////////////////////////////////////////////////

exports.profileDetails = async (req, res) => {
  try {
    let email = req.headers["email"];

    let result = await UsersModel.find({ email: email });
    res.json({ status: "success", data: result });
  } catch (error) {
    res.json({ status: "fail", message: error });
  }
};

////////////////////////////////////////\\\

exports.profileUpdate = async (req, res) => {
  try {
    let email = req.headers["email"];
    let reqBody = req.body;
    await UsersModel.updateOne({ email: email }, reqBody);
    res.json({ status: "success", message: "update completed" });
  } catch (error) {
    res.json({ status: "fail", message: error });
  }
};

exports.verifyEmail = async (req, res) => {
  try {
    let { email } = req.params;
    let user = await UsersModel.find({ email: email });

    if (user.length > 0) {
      //send mail
      let otp = Math.floor(100000 + Math.random() * 900000);

      await SendEmailUtility(
        email,
        `YOUR OTP CODE IS:${otp}`,
        "sarakr fahim verify otp"
      );

      await OTPModel.create({ email: email, otp: otp, status: "active" });

      res.json({
        status: "success",
        message: "Verification code has been sent to your email",
      });
    } else {
      res.json({ status: "fail", message: "No User Found" });
    }
  } catch (error) {
    res.json({ status: "fail", message: error.message });
  }
};

exports.verifyOTP = async (req, res) => {
  try {
    let { email, otp } = req.params;
    console.log("jjjddd");
    let user = await OTPModel.find({
      email: email,
      otp: otp,
      status: "active",
    });

    if (user.length > 0) {
      //send mail

      await OTPModel.updateOne(
        { email: email, otp: otp },
        { status: "verified" }
      );

      res.json({
        status: "success",
        message: " code Verify success",
      });
    } else {
      res.json({ status: "fail", message: "invalited code" });
    }
  } catch (error) {
    res.json({ status: "fail", message: error.message });
  }
};

exports.passwordReset = async (req, res) => {
  try {
    let { email, otp, password } = req.params;

    let user = await OTPModel.find({
      email: email,
      otp: otp,
      status: "verified",
    });

    if (user.length > 0) {
      //send mail

      await OTPModel.deleteOne({ email: email, otp: otp });
      await UsersModel.updateOne({ email: email }, { password: password });
      res.json({
        status: "success",
        message: " password update success",
      });
    } else {
      res.json({ status: "fail", message: "invalid request" });
    }
  } catch (error) {
    res.json({ status: "fail", message: error.message });
  }
};
