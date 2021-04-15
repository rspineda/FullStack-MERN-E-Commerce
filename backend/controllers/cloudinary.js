const cloudinary = require('cloudinary');

cloudinary.comfig({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
});

//upload images to cloudinary
exports.upload = async (req, res) => {
    let result = await cloudinary.uploader.upload(req.body.image, {
        public_id: `${Date.now()}`,
        resource_type: 'auto' //jpg, png..
    });
    res.json({
        public_id: result.public_id,
        url: result.secure_url
    });
};

exports.remove = async (req, res) => {
    let image_id = req.body.public_id;

    cloudinary.uploader.destroy(image_id, (err, result) => {
        if(err) return res.json({ success: false, err: err});
        res.send('ok');
    });
};