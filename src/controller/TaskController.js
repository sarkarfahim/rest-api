const TasksModel = require("../model/TasksModel");

exports.create = async (req, res) => {
  try {
    const reqBody = req.body;

    await UsersModel.create(reqBody);
    res.json({ status: "success", message: "Registration Completed" });
  } catch (error) {
    res.json({ status: "fail", message: error });
  }
};

/////////////////////////
exports.read = async (req, res) => {
  try {
    const reqBody = req.body;

    await UsersModel.create(reqBody);
    res.json({ status: "success", message: "Registration Completed" });
  } catch (error) {
    res.json({ status: "fail", message: error });
  }
};

/////////////////////////

exports.update = async (req, res) => {
  try {
    const reqBody = req.body;

    await UsersModel.create(reqBody);
    res.json({ status: "success", message: "Registration Completed" });
  } catch (error) {
    res.json({ status: "fail", message: error });
  }
};

/////////////////////////

exports.delete = async (req, res) => {
  try {
    const reqBody = req.body;

    await UsersModel.create(reqBody);
    res.json({ status: "success", message: "Registration Completed" });
  } catch (error) {
    res.json({ status: "fail", message: error });
  }
};

/////////////////////////
