const router = require("express").Router();
const Controller = require("./order.controller");
const secureAPI = require("../../utils/secure");

router.get("/", secureAPI(["admin"]), async (req, res, next) => {
  try {
    const { limit, page, id } = req.query;
    const search = { id };
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

router.patch("/status/:id", secureAPI(["admin"]), async (req, res, next) => {
  try {
    req.body.updated_at = new Date();
    req.body.updated_by = req.currentUser;
    const result = await Controller.approve(req.params.id, req.body);
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

router.put("/:id", secureAPI(["admin"]), async (req, res, next) => {
  try {
    req.body.updated_at = new Date();
    req.body.updated_by = req.currentUser;
    const result = await Controller.updateById(req.params.id, req.body);
    res.json({ data: result, msg: "success" });
  } catch (e) {
    next(e);
  }
});

router.delete("/:id", secureAPI(["admin", "user"]), async (req, res, next) => {
  try {
    const result = await Controller.remove(req.params.id);
    res.json({ data: result, msg: "success" });
  } catch (e) {
    next(e);
  }
});

module.exports = router;
