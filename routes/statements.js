module.exports.get=(req,res,next)=>{
    "use strict";
    if (req.session.name){
        let client=require('../db');
        if (req.session.type!="admin"){
            client.query("SELECT text,viewed,accepted FROM statements WHERE statements.user_id=(SELECT id FROM users WHERE name=$1)",[req.session.name],(err,result)=>{
                if (err){
                    next(new Error("Server error",500));
                }
                else{
                    res.render('statements',{
                        name:req.session.name,
                        type:req.session.type,
                        statements:result.rows
                    });
                }
            });
        }
        else{
            client.query("SELECT surname,name,patronymic,birth,passport,ticket,address,tel,email FROM employees",(err,result)=>{
                if (err){
                    next(new Error("Server error",500));
                }
                else{
                    result.rows[0]['birth']=new Date(result.rows[0]['birth']).toLocaleDateString();
                    res.render('statements',{
                        name:req.session.name,
                        type:req.session.type,
                        employees:result.rows
                    });
                }
            });
        }
    }
    else{
        res.redirect('/');
    }
};

module.exports.post=(req,res,next)=>{
    "use strict";
};
