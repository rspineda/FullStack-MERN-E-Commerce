const express = require('express');
const router = express.Router();

//midlewares
const { authCheck, adminCheck } = require('../middlewares/auth');
const { upload, remove } = require('../controllers/cloudinary');

//controlers

router.post('/uploadimages', authCheck, adminCheck, upload);
router.post('removeimage', authCheck, adminCheck, remove);

module.exports = router;