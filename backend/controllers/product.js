const Product = require('../models/product');
const slugify = require('slugify');
const User = require('../models/user');
const { updateOne } = require('../models/product');

exports.create = async (req, res ) => {
  try { 
    console.log(req.body);
    req.body.slug = slugify(req.body.title);
    const newProduct = await new Product(req.body).save();
    res.json(newProduct);
  } catch(err){
    console.log(err);
    //res.status(400).send("Create product failed");
    res.status(400).json({
        err: err.message
    });
  }
};

exports.listAll = async (req, res) => {
  let list = await Product.find({})
    .limit(parseInt(req.params.count)) //limit the number of products that are got from backend
    .populate("category")
    .populate("subs")
    .sort([["createdAt", "desc"]])
    .exec();
  res.json(list);
};

exports.remove = async (req, res) => {
  try{
    const deleted = await Product.findOneAndDelete({slug: req.params.slug}).exec();
    res.json({
        "message": "Product deleted successfully",
        "product_deleted" : deleted
    })
  }catch(err){
    console.log(err);
    return res.status(400).send('Delete product failed');
  }
};

exports.read = async (req, res) => {
  const product = await Product.findOne({slug: req.params.slug})
    .populate('category')
    .populate('subs')
    .exec();
  res.json(product);
};

exports.update = async (req, res) => {
  try{
    const updated = await Product.findOneAndUpdate({slug: req.params.slug}, req.body, {new: true}).exec();
    res.json(updated)
  }catch(err){
    console.log(`error on Udpdate Product: ${err}`);
    //return res.status(400).send('Update product failed');
    res.status(400).json({
        err: err.message,
    })
  }
};

exports.list = async (req, res) => {
  try {
    // sort: createdAt/updatedAt  order: desc/asc  page: pagination,1,2,3..
    const {sort, order, page} = req.body;
    const currentPage = page || 1;
    const perPage = 3;

    const products = await Product.find({})
      .skip((currentPage - 1) * perPage)
      .populate('category')
      .populate('subs')
      .sort([[sort, order]])
      .limit(perPage)
      .exec();
      res.json(products);
  } catch(err) {
    console.log(err);
  }
};

exports.productsCount = async (req, res) => {
  let total = await Product.find({}).estimatedDocumentCount().exec();
  res.json(total);
};

exports.productStar = async (req, res) => {
  const product = await Product.findById(req.params.productId).exec();
  const user = await User.findOne({email: req.user.email}).exec();
  const {star} = req.body;

  //¿current loggedin user have already added a rating to the product?
  let existingRatingObject = product.ratings.find(
    (ele) => (ele.postedBy.toString() === user._id.toString())
  ); 
  //user hasn't left rating yet --> push the new rating
  if(existingRatingObject === undefined) {
    let ratingAdded = await Product.findByIdAndUpdate(product._id, {
      $push: { ratings: { star: star, postedBy: user._id }}
    }, {new: true}). exec();
    console.log('ratingAdded::::::', ratingAdded);
    res.json(ratingAdded);
  } else {
    // User has left a rating before --> update its rating
    const ratingUpdated = await Product.updateOne(
      {
        ratings: { $elemMatch: existingRatingObject },
      },{
        $set: { "ratings.$.star": star}
      },{
        new: true
      }
    ).exec();
    console.log('ratingUpdated', ratingUpdated);
    res.json(ratingUpdated);  
  }
};

exports.listRelated = async (req, res) => {
  const product = await Product.findById(req.params.productId).exec();

  const related = await Product.find({
    _id: {$ne: product._id},
    category: product.category,
  })
    .limit(3)
    .populate('category')
    .populate('subs')
    .populate('postedBy')
    .exec();
  res.json(related);
}