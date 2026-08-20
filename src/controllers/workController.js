const Work = require('../models/Work');

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
    const work = await Work.findOneAndUpdate({ id: req.params.slug }, req.body, {
      new: true,
      runValidators: true,
    });
    if (!work) {
      return res.status(404).json({ message: 'Work not found' });
    }
    res.json({ work });
  } catch (error) {
    next(error);
  }
};

exports.deleteWork = async (req, res, next) => {
  try {
    const work = await Work.findOneAndDelete({ id: req.params.slug });
    if (!work) {
      return res.status(404).json({ message: 'Work not found' });
    }
    res.json({ message: 'Work deleted successfully' });
  } catch (error) {
    next(error);
  }
};