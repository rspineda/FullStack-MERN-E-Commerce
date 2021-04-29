const express = require('express');
const router = express.Router();

//midlewares
const { authCheck, adminCheck } = require('../middlewares/auth');

//controller
const { create, read, update, remove, listAll } = require('../controllers/product');

//routes
router.post('/product', authCheck, adminCheck, create);
router.get('/products/:count', listAll);
//similar to categories:
//
//router.get('/category/:slug', read);
//router.put('/category/:slug', authCheck, adminCheck, update);
//router.delete('/category/:slug', authCheck, adminCheck, remove);


module.exports = router;