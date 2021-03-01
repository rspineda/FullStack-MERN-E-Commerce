const mongoose = require('mongoose');

const categorySchema = new mongoose.Schema(
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
        }
    }, {timestamps: true} );

module.exports = mongoose.model('Category', categorySchema);