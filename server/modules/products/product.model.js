const { Schema, model } = require("mongoose");
const { ObjectId } = Schema.Types;
const commonSchema = require("../../utils/commonSchema");

const ProductSchema = new Schema({
  name: { type: String, required: true },
  brand: { type: String, required: true },
  description: { type: String, required: true, maxLength: 250 },
  sku: { type: String, required: true },
  currency: { type: String, enum: ["USD", "NPR"], default: "NPR" },
  price: { type: Number, required: true },
  quantity: { type: Number, required: true },
  images: [{ type: String }],
  category: { type: ObjectId, ref: "Category", required: true },
  ...commonSchema,
});

module.exports = model("Product", ProductSchema);
