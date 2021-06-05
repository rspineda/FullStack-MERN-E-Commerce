const Product = require('../models/product');
const slugify = require('slugify');

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

exports.put = async (req, res) => {
    try{
        const updated = await (await Product.findOneAndUpdate({slug: req.params.slug}, req.body, {new: true})).exec();
        res.json(updated)
    }catch(err){
        console.log(`error on Udpdate Product: ${err}`);
        return res.status(400).send('Update product failed');
    }
}