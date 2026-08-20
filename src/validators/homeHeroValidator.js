const { z } = require('zod');

const cloudinaryImageSchema = z.object({
  url: z.string().url('Invalid Cloudinary URL'),
  public_id: z.string().min(1, 'Public ID is required'),
  alt: z.string().optional(),
});

const homeHeroSchema = z.object({
  video_light: cloudinaryImageSchema,
  video_dark: cloudinaryImageSchema,
  poster: cloudinaryImageSchema,
});

const updateHomeHeroSchema = homeHeroSchema.partial();

module.exports = {
  homeHeroSchema,
  updateHomeHeroSchema,
};