const Work = require('../models/Work');
const { destroyCloudinaryAsset } = require('./uploadController');

exports.getWorks = async (req, res, next) => {
  try {
    const { type, published, page = 1, limit = 20 } = req.query;
    const query = {};

    if (type) query.type = type;
    if (published !== undefined) query.published = published === 'true';

    const works = await Work.find(query)
      .sort({ order: 1, createdAt: -1 })
      .skip((page - 1) * limit)
      .limit(parseInt(limit));

    const total = await Work.countDocuments(query);

    res.json({
      works,
      pagination: {
        page: parseInt(page),
        limit: parseInt(limit),
        total,
        pages: Math.ceil(total / limit),
      },
    });
  } catch (error) {
    next(error);
  }
};

exports.getWorkBySlug = async (req, res, next) => {
  try {
    const work = await Work.findOne({ id: req.params.slug });
    if (!work) {
      return res.status(404).json({ message: 'Work not found' });
    }
    res.json({ work });
  } catch (error) {
    next(error);
  }
};

exports.createWork = async (req, res, next) => {
  try {
    const work = await Work.create(req.body);
    res.status(201).json({ work });
  } catch (error) {
    next(error);
  }
};

exports.updateWork = async (req, res, next) => {
  try {
    const existingWork = await Work.findOne({ id: req.params.slug });
    if (!existingWork) {
      return res.status(404).json({ message: 'Work not found' });
    }

    // Check thumbnail change
    if (
      req.body.thumbnail &&
      existingWork.thumbnail?.public_id &&
      existingWork.thumbnail.public_id !== req.body.thumbnail.public_id
    ) {
      await destroyCloudinaryAsset(existingWork.thumbnail.public_id, 'image');
    }

    // Check photos that were removed in the updated list
    if (Array.isArray(req.body.photos) && Array.isArray(existingWork.photos)) {
      const newPublicIds = new Set(req.body.photos.map((p) => p.public_id).filter(Boolean));
      for (const oldPhoto of existingWork.photos) {
        if (oldPhoto?.public_id && !newPublicIds.has(oldPhoto.public_id)) {
          await destroyCloudinaryAsset(oldPhoto.public_id, 'image');
        }
      }
    }

    const work = await Work.findOneAndUpdate({ id: req.params.slug }, req.body, {
      new: true,
      runValidators: true,
    });
    res.json({ work });
  } catch (error) {
    next(error);
  }
};

exports.deleteWork = async (req, res, next) => {
  try {
    const work = await Work.findOne({ id: req.params.slug });
    if (!work) {
      return res.status(404).json({ message: 'Work not found' });
    }

    // Delete thumbnail from Cloudinary if exists
    if (work.thumbnail?.public_id || work.thumbnail?.url) {
      await destroyCloudinaryAsset(work.thumbnail.public_id || work.thumbnail.url, 'image');
    }

    // Delete all gallery photos from Cloudinary
    if (Array.isArray(work.photos)) {
      for (const photo of work.photos) {
        if (photo?.public_id || photo?.url) {
          await destroyCloudinaryAsset(photo.public_id || photo.url, 'image');
        }
      }
    }

    await Work.findOneAndDelete({ id: req.params.slug });
    res.json({ message: 'Work and associated media deleted successfully' });
  } catch (error) {
    next(error);
  }
};