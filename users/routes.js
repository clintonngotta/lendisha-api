const express = require("express");
const router = express.Router();

const usersController = require("./controller");

router.get("/", usersController.findAll);
router.get("/:id", usersController.getSingleById);
router.post("/addnew", usersController.addNew);
router.put("/update/:id", usersController.update);
router.delete("/:id", usersController.delete);

module.exports = router;
