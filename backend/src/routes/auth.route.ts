import express from "express";
const router = express.Router();

interface AuthData {
  username: string;
  password: string;
}

// Auth route
router.post("/", (req, res) => {
  res.send("auth");
});

export default router;
