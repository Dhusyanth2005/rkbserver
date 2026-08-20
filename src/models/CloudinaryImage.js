const mongoose = require('mongoose');

const CloudinaryImageSchema = new mongoose.Schema(
  {
    url: { type: String, required: true },
    public_id: { type: String, required: true },
    alt: { type: String, default: '' },
  },
  { _id: false }
);

module.exports = CloudinaryImageSchema;