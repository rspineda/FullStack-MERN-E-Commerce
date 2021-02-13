const User = require('../models/user');

exports.createOrUpdateUser = async (req,res) => {
    const {name, picture, email} = req.user;

    const user = await User.findOneAndUpdate({email:email}, {name:name, picture:picture}, {new: true});

    if(user){
        console.log('User updated:',user);
        res.json(user);
    }else{
        const newUser = await new User({
            email: email,
            name: name,
            picture: picture
        }).save();
        console.log('User created:',newUser);
        res.json(newUser);
    }
};
