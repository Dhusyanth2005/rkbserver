const mongoose = require('mongoose');
const CloudinaryImageSchema = require('./CloudinaryImage');

const AboutLeadershipSchema = new mongoose.Schema(
  {
    photo: {
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
    credentials: {
      type: [String],
      default: [],
    },
    bio: {
      type: String,
      required: true,
      trim: true,
    },
  },
  {
    collection: 'about_leadership',
    timestamps: { createdAt: false, updatedAt: 'updatedAt' },
  }
);

const AboutLeadership = mongoose.models.AboutLeadership || mongoose.model('AboutLeadership', AboutLeadershipSchema);

module.exports = AboutLeadership;