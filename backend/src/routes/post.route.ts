import express from "express";
const router = express.Router();

// Return recent public posts in any blog
router.get("/", (req, res) => {
  res.send("ok");
});

// Return recent public posts by a user id
router.get("/user/:id", (req, res) => {
  res.send("ok");
});

// Return recent public posts by a blog id
router.get("/blog/:id", (req, res) => {
  res.send("ok");
});

export default router;
