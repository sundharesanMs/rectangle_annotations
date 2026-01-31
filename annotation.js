const express = require("express");
const Annotation = require("../models/Annotation");
const auth = require("../middleware/authMiddleware");

const router = express.Router();

router.get("/", auth, async (req, res) => {
  const data = await Annotation.find({ userId: req.user.id });
  res.json(data);
});

router.post("/", auth, async (req, res) => {
  const annotation = await Annotation.create({
    ...req.body,
    userId: req.user.id,
  });
  res.json(annotation);
});

router.put("/:id", auth, async (req, res) => {
  const updated = await Annotation.findByIdAndUpdate(
    req.params.id,
    req.body,
    { new: true }
  );
  res.json(updated);
});

router.delete("/:id", auth, async (req, res) => {
  await Annotation.findByIdAndDelete(req.params.id);
  res.json({ success: true });
});

module.exports = router;
