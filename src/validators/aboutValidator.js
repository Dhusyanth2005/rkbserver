const { z } = require('zod');

const optionalCloudinarySchema = z.object({
  url: z.string().default(''),
  public_id: z.string().default(''),
  alt: z.string().optional().default(''),
}).refine(
  (data) => !data.url || data.url.startsWith('http://') || data.url.startsWith('https://'),
  { message: 'Invalid Cloudinary URL' }
);

const aboutHeroSchema = z.object({
  portrait: optionalCloudinarySchema.optional(),
  name: z.string().min(1, 'Name is required').max(100).default('Er. R K B Tamilpriyan'),
  role: z.string().min(1, 'Role is required').max(100).default('Civil Engineer & Urban Planner'),
  philosophy_quote: z.string().min(1, 'Philosophy quote is required'),
  philosophy_attr: z.string().min(1, 'Philosophy attribution is required').default('— Er. R K B Tamilpriyan, Managing Director'),
});

const updateAboutHeroSchema = aboutHeroSchema.partial();

const aboutLeadershipSchema = z.object({
  photo: optionalCloudinarySchema.optional(),
  name: z.string().min(1, 'Name is required').max(100).default('Er. R K B Tamilpriyan'),
  role: z.string().min(1, 'Role is required').max(100).default('Civil Engineer & Urban Planner'),
  credentials: z.array(z.string()).default([]),
  bio: z.string().min(1, 'Bio is required'),
});

const updateAboutLeadershipSchema = aboutLeadershipSchema.partial();

module.exports = {
  aboutHeroSchema,
  updateAboutHeroSchema,
  aboutLeadershipSchema,
  updateAboutLeadershipSchema,
};