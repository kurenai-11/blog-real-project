import express from "express";
const router = express.Router();

// Display all blogs
router.get("/", (req, res) => {
  console.log("req :>> ", req);
});

// Get blog data
router.get("/:id", (req, res) => {
  console.log("req");
});

// Create a blog
router.post("/:id", (req, res) => {
  console.log("req");
});

// Edit a blog == add a new post
router.put("/:id", (req, res) => {
  console.log("req");
});

// Delete a blog
router.delete("/:id", (req, res) => {
  console.log("req");
});

export default router;
