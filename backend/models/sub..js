const mongoose = require('mongoose');
const { ObjectId } = mongoose.Schema;

//model for subcategories
const subSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            trim: true, //so spaces are omited.
            required: 'Name is required',
            minlength: [2,'Too short'],
            maxlength: [32, 'Too long']
        },
        slug: {
            type: String,
            unique: true, //so there is only one category for each brand
            lowercase: true,
            index: true
        },
        parent: {
                type: ObjectId,
                ref: "Category",
                required: true
            }
    }, {timestamps: true} );

module.exports = mongoose.model('Sub', subSchema);