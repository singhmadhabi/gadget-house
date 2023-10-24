require("dotenv").config();
const bodyParser = require("body-parser");
const cors = require("cors");
const express = require("express");
const mongoose = require("mongoose");
const stripe = require("stripe")(process.env.SECRET_KEY);

const indexRouter = require("./routes");
const OrderController = require("./modules/orders/order.controller");

const PORT = process.env.PORT || 3000;
const DB_URL = process.env.DB_URL;
const FRONTEND_URL = process.env.FRONTEND_URL;
const endpointSecret = process.env.ENDPOINT_SECRET;

mongoose.connect(DB_URL).then(() => {
  console.log("Database is running...");
});
const app = express();
app.use(cors());
app.use(express.static("public"));

app.post(
  "/api/v1/orders/webhook",
  express.raw({ type: "application/json" }),
  async (request, response) => {
    const sig = request.headers["stripe-signature"];
    try {
      const event = stripe.webhooks.constructEvent(
        request.body,
        sig,
        endpointSecret
      );
      switch (event.type) {
        case "checkout.session.completed":
          const session_completed = event.data.object;
          await OrderController.updateOrderByStripe(
            session_completed,
            "completed"
          );
          break;
        case "checkout.session.expired":
          const session_expired = event.data.object;
          await OrderController.updateOrderByStripe(session_expired, "failed");
          break;
        case "checkout.session.async_payment_succeeded":
          const payment_succeeded = event.data.object;
          await OrderController.updateOrderByStripe(
            payment_succeeded,
            "completed"
          );
          break;
        case "checkout.session.async_payment_failed":
          const payment_failed = event.data.object;
          await OrderController.updateOrderByStripe(payment_failed, "failed");
          break;
        default:
          console.log(`Unhandled event type ${event.type}`);
      }
      response.send();
    } catch (err) {
      response.status(400).send(`Webhook Error: ${err.message}`);
      return;
    }
  }
);

app.use(express.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.post("/create-checkout-session", async (req, res, next) => {
  try {
    const dt = new Date();
    dt.setMinutes(dt.getMinutes() + 30);
    const session = await stripe.checkout.sessions.create({
      line_items: req.body,
      mode: "payment",
      success_url: `${FRONTEND_URL}/checkout/success`,
      cancel_url: `${FRONTEND_URL}/checkout/failed`,
      expires_at: dt,
    });

    res.json({
      data: {
        stripeId: session.id,
        url: session.url,
      },
      msg: "success",
    });
  } catch (e) {
    next(e);
  }
});

app.use("/", indexRouter);

app.use((err, req, res, next) => {
  const errMsg = err
    ? err.toString().split("Error: ")[1]
    : "Something went wrong";
  res.status(500).json({ data: "", msg: errMsg });
});

app.listen(PORT, () => {
  console.log(`App is running on port ${PORT}`);
});
