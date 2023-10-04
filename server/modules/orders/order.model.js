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
      product: { type: ObjectId, required: true, ref: "Product" },
    },
  ],
  paymentMethod: {
    type: String,
    required: true,
    enum: ["COD", "PAYPAL", "CC"],
    default: "COD",
  },
  payment: {
    type: String,
    required: true,
    default: "COD",
  },
  address: { type: String },
  status: { type: String, enum: ["pending", "completed"], default: "pending" },
  ...commonSchema,
});

module.exports = model("Order", orderSchema);
