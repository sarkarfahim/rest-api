const mongoose = require("mongoose");

const SchemaDatabase = mongoose.Schema(
  {
    email: { type: String, require: true },
    title: { type: String, require: true },
    description: { type: String, require: true },
    status: { type: String, require: true },
  },
  { timestamps: true, versionKey: false }
);

const TaskModel = mongoose.model("task1", SchemaDatabase);

module.exports = TaskModel;
