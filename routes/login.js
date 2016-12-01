module.exports.get=(req,res,next)=>{
    "use strict";
    if (req.session.name){
        res.redirect('/statements')
    }
    else{
        res.render('login');
    }
};

module.exports.post=(req,res,next)=>{
    "use strict";
    let User=require('../models/User.js');
    let user=new User('','','','','','','',req.body.log,req.body.pass,req.body.log);
    user.signin(req,res);
};