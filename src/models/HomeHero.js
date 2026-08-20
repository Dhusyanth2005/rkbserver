const mongoose = require('mongoose');
const CloudinaryImageSchema = require('./CloudinaryImage');

const HomeHeroSchema = new mongoose.Schema(
  {
    video_light: {
      type: CloudinaryImageSchema,
      required: true,
    },
    video_dark: {
      type: CloudinaryImageSchema,
      required: true,
    },
    poster: {
      type: CloudinaryImageSchema,
      required: true,
    },
  },
  {
    collection: 'home_hero',
    timestamps: { createdAt: false, updatedAt: 'updatedAt' },
  }
);

const HomeHero = mongoose.models.HomeHero || mongoose.model('HomeHero', HomeHeroSchema);

module.exports = HomeHero;