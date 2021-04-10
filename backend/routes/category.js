const express = require('express');
const router = express.Router();

//midlewares
const { authCheck, adminCheck } = require('../middlewares/auth');

//controller
const { create, read, update, remove, list, getSubs } = require('../controllers/category');

//routes
router.post('/category', authCheck, adminCheck, create);
router.get('/categories', list);
router.get('/category/:slug', read);
router.put('/category/:slug', authCheck, adminCheck, update);
router.delete('/category/:slug', authCheck, adminCheck, remove);
router.get('/category/subs/:id', getSubs); //it will return the subcategories attached to a specific parent category.

module.exports = router;