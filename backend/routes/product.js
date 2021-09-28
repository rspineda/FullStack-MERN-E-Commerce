const express = require('express');
const router = express.Router();

//midlewares
const {authCheck, adminCheck} = require('../middlewares/auth');

//controller
const {
  create, 
  read, 
  update, 
  remove, 
  listAll, 
  list, 
  productsCount,
  productStar,
} = require('../controllers/product');

//routes
router.post('/product', authCheck, adminCheck, create);
router.get('/products/total', productsCount);
router.get('/products/:count', listAll);
router.delete('/product/:slug', authCheck, adminCheck, remove);
router.get('/product/:slug', read);
router.put('/product/:slug', authCheck, adminCheck, update);

//Home
router.post('/products', list);
//Pagination
router.get('/products/total', productsCount);
//rating
router.put('/product/star/:productId', authCheck, productStar);

module.exports = router;