const cloudinary = require('../config/cloudinary');
const multer = require('multer');

const storage = multer.memoryStorage();
const upload = multer({
  storage,
  limits: { fileSize: 10 * 1024 * 1024 }, // 10MB
  fileFilter: (req, file, cb) => {
    const allowedTypes = ['image/jpeg', 'image/png', 'image/webp', 'video/mp4', 'video/webm'];
    if (allowedTypes.includes(file.mimetype)) {
      cb(null, true);
    } else {
      cb(new Error('Invalid file type. Only JPEG, PNG, WebP, MP4, WebM allowed.'), false);
    }
  },
});

const uploadToCloudinary = (buffer, folder, resourceType = 'auto') => {
  return new Promise((resolve, reject) => {
    const stream = cloudinary.uploader.upload_stream(
      {
        folder,
        resource_type: resourceType,
        transformation: resourceType === 'image' ? [{ quality: 'auto', fetch_format: 'auto' }] : undefined,
      },
      (error, result) => {
        if (error) reject(error);
        else resolve(result);
      }
    );
    stream.end(buffer);
  });
};

exports.uploadMiddleware = upload;

exports.uploadFile = async (req, res, next) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: 'No file uploaded' });
    }

    const { folder = 'rkbsite/misc' } = req.body;
    const resourceType = req.file.mimetype.startsWith('video/') ? 'video' : 'image';

    const result = await uploadToCloudinary(req.file.buffer, folder, resourceType);

    res.json({
      url: result.secure_url,
      public_id: result.public_id,
      format: result.format,
      width: result.width,
      height: result.height,
    });
  } catch (error) {
    next(error);
  }
};

const destroyCloudinaryAsset = async (public_id, resourceType = 'image') => {
  if (!public_id) return { result: 'not_provided' };

  let cleanId = public_id;
  if (cleanId.startsWith('http://') || cleanId.startsWith('https://')) {
    const match = cleanId.match(/\/upload\/(?:v\d+\/)?(.+?)(?:\.[a-zA-Z0-9]+)?$/);
    if (match) {
      cleanId = match[1];
    }
  }

  const idCandidates = [cleanId];
  const withoutExt = cleanId.replace(/\.[^/.]+$/, '');
  if (withoutExt !== cleanId) {
    idCandidates.push(withoutExt);
  }

  const typesToTry = resourceType === 'video'
    ? ['video', 'image', 'raw']
    : ['image', 'video', 'raw'];

  let lastResult = null;

  for (const id of idCandidates) {
    for (const type of typesToTry) {
      try {
        const res = await cloudinary.uploader.destroy(id, {
          resource_type: type,
          invalidate: true,
        });
        lastResult = res;
        if (res.result === 'ok') {
          return res;
        }
      } catch (err) {
        console.error(`Cloudinary destroy attempt error (id: ${id}, type: ${type}):`, err.message);
      }
    }
  }

  return lastResult || { result: 'not found' };
};

exports.destroyCloudinaryAsset = destroyCloudinaryAsset;

exports.deleteFile = async (req, res, next) => {
  try {
    const { public_id, resource_type = 'image' } = req.body;

    if (!public_id) {
      return res.status(400).json({ message: 'Public ID is required' });
    }

    const result = await destroyCloudinaryAsset(public_id, resource_type);

    res.json({ message: 'File deletion processed', result: result?.result });
  } catch (error) {
    next(error);
  }
};