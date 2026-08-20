const HomeHero = require('../models/HomeHero');

exports.getHomeHero = async (req, res, next) => {
  try {
    let hero = await HomeHero.findOne();
    if (!hero) {
      hero = await HomeHero.create({
        video_light: { url: '', public_id: '', alt: '' },
        video_dark: { url: '', public_id: '', alt: '' },
        poster: { url: '', public_id: '', alt: '' },
      });
    }
    res.json({ hero });
  } catch (error) {
    next(error);
  }
};

exports.updateHomeHero = async (req, res, next) => {
  try {
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