const { z } = require('zod');

const optionalCloudinarySchema = z.object({
  url: z.string().default(''),
  public_id: z.string().default(''),
  alt: z.string().optional().default(''),
}).refine(
  (data) => !data.url || data.url.startsWith('http://') || data.url.startsWith('https://'),
  { message: 'Invalid Cloudinary URL' }
);

const homeHeroSchema = z.object({
  video_light: optionalCloudinarySchema.optional(),
  video_dark: optionalCloudinarySchema.optional(),
  poster: optionalCloudinarySchema.optional(),
  about_image: optionalCloudinarySchema.optional(),
  service_new_construction: optionalCloudinarySchema.optional(),
  service_remodeling: optionalCloudinarySchema.optional(),
  service_renovation: optionalCloudinarySchema.optional(),
});

const updateHomeHeroSchema = homeHeroSchema.partial();

module.exports = {
  homeHeroSchema,
  updateHomeHeroSchema,
};