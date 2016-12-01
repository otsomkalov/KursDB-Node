module.exports.get=(req,res,next)=>{
    "use strict";
    res.render('register');
};

module.exports.post=(req,res,next)=>{
    "use strict";
    let User=require('../models/User.js');
    let user=new User(req.body.surname,req.body.name,req.body.patronymic,req.body.birth,req.body.passport,req.body.address,req.body.tel,req.body.log,req.body.pass,req.body.email);
    user.reg(res);
};