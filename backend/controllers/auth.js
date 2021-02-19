const User = require('../models/user');

exports.createOrUpdateUser = async (req,res) => {
    const {name, picture, email} = req.user;

    const user = await User.findOneAndUpdate({email:email}, {name: (name == null) ? email.split("@")[0] : name, picture:picture}, {new: true});

    if(user){
        console.log('User updated:',user);
        res.json(user);
    }else{
        const newUser = await new User({
            email: email,
            name: (name == null) ? email.split("@")[0] : name,
            picture: picture
        }).save();
        console.log('User created:',newUser);
        res.json(newUser);
    }
};

exports.currentUser = (req, res) =>  {
    User.findOne({email: req.user.email}).exec((err,user)=>{
        if(err) throw new Error(err);
        res.json(user);
    });
}