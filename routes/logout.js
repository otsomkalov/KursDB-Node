module.exports=(req,res,next)=>{
    "use strict";
    req.session.destroy();
    res.redirect('/');
};