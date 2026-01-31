const mongoose = require("mongoose");

const AnnotationSchema = new mongoose.Schema({
  userId: mongoose.Schema.Types.ObjectId,
  x: Number,
  y: Number,
  width: Number,
  height: Number,
});

module.exports = mongoose.model("Annotation", AnnotationSchema);
