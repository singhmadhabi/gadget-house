const router = require("express").Router();
const authRouter = require("../modules/auth/auth.route");
const categoryRouter = require("../modules/categories/category.route");
const productRouter = require("../modules/products/product.route");
const userRouter = require("../modules/users/user.route");

router.get("/", (req, res, next) => {
  res.json({ data: "", msg: "Welcome to Gadget House APIs" });
});

router.use("/auth", authRouter);
router.use("/categories", categoryRouter);
router.use("/products", productRouter);
router.use("/users", userRouter);

router.all("*", (req, res, next) => {
  try {
    res.status(404).json({ data: "", msg: "Routes not found" });
  } catch (e) {
    next(e);
  }
});

module.exports = router;
