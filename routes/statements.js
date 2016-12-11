module.exports.get=(req,res,next)=>{
    "use strict";
    if (req.session.type=="user"){
        require('./user/statements').get(req,res,next);
    }
    else{
        if (req.session.type=="emp"){
            require('./employee/statements').get(req,res,next);
        }
        else{
            res.redirect('/employees')
        }
    }
};

module.exports.post=(req,res,next)=>{
    "use strict";
    if (req.session.type=="user"){
        require('./user/statements').post(req,res,next);
    }
    else{
        require('./employee/statements').post(req,res,next);
    }
};

module.exports.put=(req,res,next)=>{
    "use strict";
    if (req.session.type=="user"){
        require('./user/statements').put(req,res,next);
    }
    else{
        require('./employee/statements').put(req,res,next);
    }
};