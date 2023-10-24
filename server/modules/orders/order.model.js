const { Schema, model } = require("mongoose");
const { ObjectId } = Schema.Types;
const commonSchema = require("../../utils/commonSchema");

const orderSchema = new Schema({
  id: { type: String, required: true, index: { unique: true } },
  orderDate: { type: Date, required: true, default: Date.now() },
  total: { type: Number, required: true },
  products: [
    {
      quantity: { type: Number, required: true },
      price: { type: Number, required: true },
      amount: { type: Number, required: true },
      product: { type: ObjectId, ref: "Product", required: true },
    },
  ],
  paymentMethod: {
    type: String,
    required: true,
    enum: ["COD", "STRIPE"],
    default: "COD",
  },
  stripeId: { type: String },
  name: { type: String, required: true },
  email: { type: String },
  address: { type: String },
  status: {
    type: String,
    enum: ["pending", "completed", "failed"],
    default: "pending",
  },
  ...commonSchema,
});

module.exports = model("Order", orderSchema);
