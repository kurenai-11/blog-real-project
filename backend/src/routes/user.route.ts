import express from "express";
const router = express.Router();

router.get("/", (req, res) => {
  res.status(404).send({ user: "not_found", error: "no_id_specifier" });
});

// Getting user data
router.get("/:id", (req, res) => {
  console.log("req :>> ", req.params);
  res.status(200).send({ user: "0", error: null });
});

// Creating a user
router.post("/:id", (req, res) => {
  const reqData = req.body;
  console.log("req.body :>> ", reqData);
  res.status(200).json(reqData);
});

// Updating user data
router.put("/:id", (req, res) => {
  res.status(200).send("todo");
});

// Deleting a user
router.delete("/:id", (req, res) => {
  res.status(200).send("todo");
});

export default router;
