const router = require("express").Router();
const Controller = require("./product.controller");

router.get("/", async (req, res, next) => {
  try {
    const { limit, page, name } = req.query;
    const search = { name };
    const result = await Controller.list(limit, page, search);
    res.json({ data: result, msg: "success" });
  } catch (e) {
    next(e);
  }
});

router.post("/", async (req, res, next) => {
  try {
    const result = await Controller.create(req.body);
    res.json({ data: result, msg: "success" });
  } catch (e) {
    next(e);
  }
});

router.get("/:id", async (req, res, next) => {
  try {
    const result = await Controller.getById(req.params.id);
    res.json({ data: result, msg: "success" });
  } catch (e) {
    next(e);
  }
});

router.put("/:id", async (req, res, next) => {
  try {
    const result = await Controller.updateById(req.params.id, req.body);
    res.json({ data: result, msg: "success" });
  } catch (e) {
    next(e);
  }
});

router.delete("/:id", async (req, res, next) => {
  try {
    const result = await Controller.remove(req.params.id);
    res.json({ data: result, msg: "success" });
  } catch (e) {
    next(e);
  }
});

module.exports = router;
