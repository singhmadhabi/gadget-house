const { Schema } = require("mongoose");
const { ObjectId } = Schema;

module.exports = {
  created_at: { type: Date, default: Date.now() },
  updated_at: { type: Date, default: Date.now() },
  created_by: { type: ObjectId, ref: "User" },
  updated_by: { type: ObjectId, ref: "User" },
};
