const admin = require('../firebase/index');
const User = require('../models/user');

//Check if the user is authenticated
exports.authCheck = async (req, res, next) => {
    //console.log(req.headers); //client token
    try{
        const firebaseUser= await admin.auth().verifyIdToken(req.headers.authtoken);
        console.log('Firebase user in authcheck:', firebaseUser);
        req.user = firebaseUser;
        next();
    }catch(err){
        res.status(401).json({
            err: "Invalid or expired token"
        });
    }
};

//Check if the authenticated  user is admin, so allow him to next pages
exports.adminCheck = async (req, res, next) => {
    const { email } = req.user;

    const adminUser = await User.findOne({ email: email}).exec();

    if(adminUser.role !== 'admin') {
        res.status(403).json({
          err: 'Admin resource. Acces denied'  
        });
    }else{
        next();
    }
};
