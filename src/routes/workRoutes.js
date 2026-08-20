const express = require('express');
const router = express.Router();
const workController = require('../controllers/workController');
const { workSchema, updateWorkSchema } = require('../validators/workValidator');
const validate = require('../middleware/validate');
const auth = require('../middleware/auth');

router.get('/', workController.getWorks);
router.get('/:slug', workController.getWorkBySlug);
router.post('/', auth, validate(workSchema), workController.createWork);
router.put('/:slug', auth, validate(updateWorkSchema), workController.updateWork);
router.delete('/:slug', auth, workController.deleteWork);

module.exports = router;