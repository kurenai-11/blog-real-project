import express from "express";
const router = express.Router();

// Display (recent) posts
router.get("/", (req, res) => {
  res.send("ok");
});

// Display posts for a user id
router.get("/user/:id", (req, res) => {
  res.send("ok");
});

// Display posts for a blog id
// Better to reroute(alias) to /blog/:id from the blog route?
router.get("/blog/:id", (req, res) => {
  res.send("ok");
});

// Post to a blog id
// Same as above, maybe it is better to reroute to /blog/:id put request
// from the blog route?
router.post("/blog/:id", (req, res) => {
  res.send("ok");
});

export default router;
