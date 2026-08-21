const AboutHero = require('../models/AboutHero');
const AboutLeadership = require('../models/AboutLeadership');
const { destroyCloudinaryAsset } = require('./uploadController');

exports.getAbout = async (req, res, next) => {
  try {
    let hero = await AboutHero.findOne();
    if (!hero) {
      hero = await AboutHero.create({
        portrait: { url: '', public_id: '', alt: '' },
        philosophy_quote: '',
      });
    }

    let leadership = await AboutLeadership.findOne();
    if (!leadership) {
      leadership = await AboutLeadership.create({
        photo: { url: '', public_id: '', alt: '' },
        bio: '',
      });
    }

    res.json({ hero, leadership });
  } catch (error) {
    next(error);
  }
};

exports.updateAboutHero = async (req, res, next) => {
  try {
    const existingHero = await AboutHero.findOne();
    if (
      existingHero &&
      req.body.portrait &&
      existingHero.portrait?.public_id &&
      existingHero.portrait.public_id !== req.body.portrait.public_id
    ) {
      await destroyCloudinaryAsset(existingHero.portrait.public_id, 'image');
    }

    const hero = await AboutHero.findOneAndUpdate({}, req.body, {
      new: true,
      upsert: true,
      runValidators: true,
    });
    res.json({ hero });
  } catch (error) {
    next(error);
  }
};

exports.updateAboutLeadership = async (req, res, next) => {
  try {
    const existingLeader = await AboutLeadership.findOne();
    if (
      existingLeader &&
      req.body.photo &&
      existingLeader.photo?.public_id &&
      existingLeader.photo.public_id !== req.body.photo.public_id
    ) {
      await destroyCloudinaryAsset(existingLeader.photo.public_id, 'image');
    }

    const leadership = await AboutLeadership.findOneAndUpdate({}, req.body, {
      new: true,
      upsert: true,
      runValidators: true,
    });
    res.json({ leadership });
  } catch (error) {
    next(error);
  }
};