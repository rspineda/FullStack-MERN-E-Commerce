const Sub = require('../models/sub');
const slugify = require('slugify');

exports.create = async (req, res) => {
    try{
        const { name, parent } = req.body;
        const sub = await new Sub({ name: name , parent: parent, slug: slugify(name)}).save();
        res.json(sub);
    }catch(err){
        console.log("Create Subcategory error:",err);
        res.status(400).send('Create subcategory failed');
    }
};

exports.list = async (req, res) => {
    let list = await Sub.find({}).sort({createdAt:-1}).exec();
    res.json(list);
};

exports.read = async (req, res) => {
    let sub = await Sub.findOne({slug: req.params.slug}).exec();
    res.json(sub);
};

exports.update = async (req, res) => {
    const { name, parent } = req.body;
    try{
        const updated = await Sub.findOneAndUpdate({slug: req.params.slug},{name: name, parent: parent, slug: slugify(name)}, {new:true});
        res.json(updated);
    }catch (err) {
        res.status(400).send('Update subcategory failed');
    }
};

exports.remove = async (req, res) => {
    try{
        const deleted = await Sub.findOneAndDelete({slug: req.params.slug});
        res.json({
            "message": "Subcategory deleted successfully",
            "subcategory_deleted" : deleted
        });
    }catch (err) {
        res.status(400).send("Delete subcategory failed");
    }
};