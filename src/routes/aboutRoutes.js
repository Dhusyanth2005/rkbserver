const express = require('express');
const router = express.Router();
const aboutController = require('../controllers/aboutController');
const { updateAboutHeroSchema, updateAboutLeadershipSchema } = require('../validators/aboutValidator');
const validate = require('../middleware/validate');
const auth = require('../middleware/auth');

router.get('/', aboutController.getAbout);
router.put('/hero', auth, validate(updateAboutHeroSchema), aboutController.updateAboutHero);
router.put('/leadership', auth, validate(updateAboutLeadershipSchema), aboutController.updateAboutLeadership);

module.exports = router;