const AboutHero = require('../models/AboutHero');
const AboutLeadership = require('../models/AboutLeadership');

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