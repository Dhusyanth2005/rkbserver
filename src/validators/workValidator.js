const { z } = require('zod');

const cloudinaryImageSchema = z.object({
  url: z.string().url('Invalid Cloudinary URL'),
  public_id: z.string().min(1, 'Public ID is required'),
  alt: z.string().min(1, 'Alt text is required'),
});

const photoSchema = z.object({
  label: z.string().min(1, 'Label is required'),
  url: z.string().url('Invalid Cloudinary URL'),
  public_id: z.string().min(1, 'Public ID is required'),
  alt: z.string().min(1, 'Alt text is required'),
});

const workSchema = z.object({
  id: z.string().min(1, 'ID is required').regex(/^[a-z0-9-]+$/, 'ID must be lowercase alphanumeric with hyphens'),
  title: z.string().min(1, 'Title is required').max(100),
  type: z.enum(['New Construction', 'Remodeling', 'Renovation']),
  year: z.coerce.number().int().min(1900).max(2100),
  locality: z.string().min(1, 'Locality is required').max(100),
  district: z.string().min(1, 'District is required').max(100),
  description: z.string().min(1, 'Description is required'),
  thumbnail: cloudinaryImageSchema,
  meta: z.string().min(1, 'Meta is required').max(200),
  photos: z.array(photoSchema).min(1, 'At least one photo is required'),
  order: z.coerce.number().int().default(0),
  published: z.coerce.boolean().default(false),
});

const updateWorkSchema = workSchema.partial();

module.exports = {
  workSchema,
  updateWorkSchema,
};