const mongoose = require('mongoose');
const CloudinaryImageSchema = require('./CloudinaryImage');

const AboutHeroSchema = new mongoose.Schema(
  {
    portrait: {
      type: CloudinaryImageSchema,
      default: () => ({ url: '', public_id: '', alt: '' }),
    },
    name: {
      type: String,
      required: true,
      default: 'Er. R K B Tamilpriyan',
      trim: true,
    },
    role: {
      type: String,
      required: true,
      default: 'Civil Engineer & Urban Planner',
      trim: true,
    },
    philosophy_quote: {
      type: String,
      required: true,
      trim: true,
    },
    philosophy_attr: {
      type: String,
      required: true,
      default: '— Er. R K B Tamilpriyan, Managing Director',
      trim: true,
    },
  },
  {
    collection: 'about_hero',
    timestamps: { createdAt: false, updatedAt: 'updatedAt' },
  }
);

const AboutHero = mongoose.models.AboutHero || mongoose.model('AboutHero', AboutHeroSchema);

module.exports = AboutHero;