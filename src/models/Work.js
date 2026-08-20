const mongoose = require('mongoose');
const CloudinaryImageSchema = require('./CloudinaryImage');

const PhotoSchema = new mongoose.Schema(
  {
    label: { type: String, required: true, trim: true },
    url: { type: String, required: true },
    public_id: { type: String, required: true },
    alt: { type: String, required: true },
  },
  { _id: false }
);

const WorkSchema = new mongoose.Schema(
  {
    id: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },
    title: { type: String, required: true, trim: true },
    type: {
      type: String,
      required: true,
      enum: ['New Construction', 'Remodeling', 'Renovation'],
    },
    year: { type: Number, required: true, min: 1900, max: 2100 },
    locality: { type: String, required: true, trim: true },
    district: { type: String, required: true, trim: true },
    description: { type: String, required: true },
    thumbnail: {
      type: CloudinaryImageSchema,
      required: true,
    },
    meta: { type: String, required: true, trim: true },
    photos: {
      type: [PhotoSchema],
      required: true,
      validate: {
        validator: (v) => v.length > 0,
        message: 'At least one photo is required',
      },
    },
    order: { type: Number, default: 0 },
    published: { type: Boolean, default: false },
  },
  {
    collection: 'works',
    timestamps: { createdAt: 'createdAt', updatedAt: 'updatedAt' },
  }
);

WorkSchema.index({ type: 1, published: 1, order: 1 });

const Work = mongoose.models.Work || mongoose.model('Work', WorkSchema);

module.exports = Work;