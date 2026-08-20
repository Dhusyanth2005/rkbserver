const express = require('express');
const router = express.Router();
const homeHeroController = require('../controllers/homeHeroController');
const { homeHeroSchema, updateHomeHeroSchema } = require('../validators/homeHeroValidator');
const validate = require('../middleware/validate');
const auth = require('../middleware/auth');

router.get('/', homeHeroController.getHomeHero);
router.put('/', auth, validate(updateHomeHeroSchema), homeHeroController.updateHomeHero);

module.exports = router;