const { Schema, model } = require("mongoose");
const commonSchema = require("../../utils/commonSchema");

const CategorySchema = new Schema({
  name: { type: String, required: true },
  slug: { type: String, required: true },
  alias: [{ type: String }],
  ...commonSchema,
});

module.exports = model("Category", CategorySchema);
