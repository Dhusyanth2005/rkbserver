const mongoose = require('mongoose');
const CloudinaryImageSchema = require('./CloudinaryImage');

const HomeHeroSchema = new mongoose.Schema(
  {
    video_light: {
      type: CloudinaryImageSchema,
      default: () => ({ url: '', public_id: '', alt: '' }),
    },
    video_dark: {
      type: CloudinaryImageSchema,
      default: () => ({ url: '', public_id: '', alt: '' }),
    },
    poster: {
      type: CloudinaryImageSchema,
      default: () => ({ url: '', public_id: '', alt: '' }),
    },
    about_image: {
      type: CloudinaryImageSchema,
      default: () => ({ url: '', public_id: '', alt: '' }),
    },
    service_new_construction: {
      type: CloudinaryImageSchema,
      default: () => ({ url: '', public_id: '', alt: '' }),
    },
    service_remodeling: {
      type: CloudinaryImageSchema,
      default: () => ({ url: '', public_id: '', alt: '' }),
    },
    service_renovation: {
      type: CloudinaryImageSchema,
      default: () => ({ url: '', public_id: '', alt: '' }),
    },
  },
  {
    collection: 'home_hero',
    timestamps: { createdAt: false, updatedAt: 'updatedAt' },
  }
);

const HomeHero = mongoose.models.HomeHero || mongoose.model('HomeHero', HomeHeroSchema);

module.exports = HomeHero;