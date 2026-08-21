const mongoose = require('mongoose');

const CloudinaryImageSchema = new mongoose.Schema(
  {
    url: { type: String, default: '' },
    public_id: { type: String, default: '' },
    alt: { type: String, default: '' },
  },
  { _id: false }
);

module.exports = CloudinaryImageSchema;