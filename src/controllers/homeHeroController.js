const HomeHero = require('../models/HomeHero');
const { destroyCloudinaryAsset } = require('./uploadController');

exports.getHomeHero = async (req, res, next) => {
  try {
    let hero = await HomeHero.findOne();
    if (!hero) {
      hero = await HomeHero.create({
        video_light: { url: '', public_id: '', alt: '' },
        video_dark: { url: '', public_id: '', alt: '' },
        poster: { url: '', public_id: '', alt: '' },
        about_image: { url: '', public_id: '', alt: '' },
        service_new_construction: { url: '', public_id: '', alt: '' },
        service_remodeling: { url: '', public_id: '', alt: '' },
        service_renovation: { url: '', public_id: '', alt: '' },
      });
    }
    res.json({ hero });
  } catch (error) {
    next(error);
  }
};

exports.updateHomeHero = async (req, res, next) => {
  try {
    const existingHero = await HomeHero.findOne();

    if (existingHero) {
      // Check video_light
      if (
        req.body.video_light &&
        existingHero.video_light?.public_id &&
        existingHero.video_light.public_id !== req.body.video_light.public_id
      ) {
        await destroyCloudinaryAsset(existingHero.video_light.public_id, 'video');
      }

      // Check video_dark
      if (
        req.body.video_dark &&
        existingHero.video_dark?.public_id &&
        existingHero.video_dark.public_id !== req.body.video_dark.public_id
      ) {
        await destroyCloudinaryAsset(existingHero.video_dark.public_id, 'video');
      }

      // Check poster
      if (
        req.body.poster &&
        existingHero.poster?.public_id &&
        existingHero.poster.public_id !== req.body.poster.public_id
      ) {
        await destroyCloudinaryAsset(existingHero.poster.public_id, 'image');
      }

      // Check about_image
      if (
        req.body.about_image &&
        existingHero.about_image?.public_id &&
        existingHero.about_image.public_id !== req.body.about_image.public_id
      ) {
        await destroyCloudinaryAsset(existingHero.about_image.public_id, 'image');
      }

      // Check service_new_construction
      if (
        req.body.service_new_construction &&
        existingHero.service_new_construction?.public_id &&
        existingHero.service_new_construction.public_id !== req.body.service_new_construction.public_id
      ) {
        await destroyCloudinaryAsset(existingHero.service_new_construction.public_id, 'image');
      }

      // Check service_remodeling
      if (
        req.body.service_remodeling &&
        existingHero.service_remodeling?.public_id &&
        existingHero.service_remodeling.public_id !== req.body.service_remodeling.public_id
      ) {
        await destroyCloudinaryAsset(existingHero.service_remodeling.public_id, 'image');
      }

      // Check service_renovation
      if (
        req.body.service_renovation &&
        existingHero.service_renovation?.public_id &&
        existingHero.service_renovation.public_id !== req.body.service_renovation.public_id
      ) {
        await destroyCloudinaryAsset(existingHero.service_renovation.public_id, 'image');
      }
    }

    const hero = await HomeHero.findOneAndUpdate({}, req.body, {
      new: true,
      upsert: true,
      runValidators: true,
    });
    res.json({ hero });
  } catch (error) {
    next(error);
  }
};