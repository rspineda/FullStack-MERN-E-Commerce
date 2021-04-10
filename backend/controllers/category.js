const Category = require('../models/category');
const Sub = require('../models/sub');
const slugify = require('slugify');

exports.create = async (req, res) => {
    try{
        const { name } = req.body;
        const category = await new Category({ name: name , slug: slugify(name)}).save();
        res.json(category);
    }catch(err){
        res.status(400).send('Create category failed');
    }
};

exports.list = async (req, res) => {
    let list = await Category.find({}).sort({createdAt:-1}).exec();
    res.json(list);
};

exports.read = async (req, res) => {
    let category = await Category.findOne({slug: req.params.slug}).exec();
    res.json(category);
};

exports.update = async (req, res) => {
    const { name } = req.body;
    try{
        const updated = await Category.findOneAndUpdate({slug: req.params.slug},{name: name, slug: slugify(name)}, {new:true});
        res.json(updated);
    }catch (err) {
        res.status(400).send('Update category failed');
    }
};

exports.remove = async (req, res) => {
    try{
        const deleted = await Category.findOneAndDelete({slug: req.params.slug});
        res.json({
            "message": "Category deleted successfully",
            "category_deleted" : deleted
        });
    }catch (err) {
        res.status(400).send("Delete category failed");
    }
};

exports.getSubs = (req, res) => {
    Sub.find({parent: req.params._id}).exec((err,subs)=>{
        if(err) console.log(err);
        res.json(subs);
    });
}