module.exports=(req,res,next)=>{
    "use strict";
    if (req.body.type){
        req.session.destroy();
        res.send(200);
    }
    next();
};