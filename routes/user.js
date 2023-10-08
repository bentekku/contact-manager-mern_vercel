const express = require("express");
// Creating router object
const router = express.Router();
const {
  create,
  getAll,
  get,
  overwrite,
  update,
  remove,
} = require("../controller/user");

router
  .post("/", create)
  .get("/", getAll)
  .get("/:id", get)
  .put("/:id", overwrite)
  .patch("/:id", update)
  .delete("/:id", remove);

exports.router = router;
