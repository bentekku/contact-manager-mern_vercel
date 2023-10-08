const mongoose = require("mongoose");
const { Schema } = require("mongoose");

// Schema
const contactSchema = new Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  maidenName: { type: String, required: true },
  age: { type: Number, required: true },
  gender: { type: String, required: true },
  phone: { type: String, required: true },
  image: { type: String, required: true },
});

// Model
exports.Contact = mongoose.model("contact", contactSchema);
