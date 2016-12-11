let client=require('../../db');

module.exports.get=(req,res,next)=>{
    "use strict";
    client.query("SELECT surname,name,patronymic,tel,address FROM users WHERE id=$1",[req.session.userId],(err,result)=>{
        res.render('./user/add',{
            type:req.session.type,
            surname:result.rows[0].surname,
            name:result.rows[0].name,
            patronymic:result.rows[0].patronymic,
            address:result.rows[0].address,
            tel:result.rows[0].tel
        });
    });
};

module.exports.post=(req,res,next)=>{
    "use strict";
    client.query("INSERT INTO statements (text,user_id,date) VALUES($1,$2,$3)",[req.body.text,req.session.userId,new Date()],(err,result)=>{
        if (err){
            next(500)
        }
        else{
            res.sendStatus(303)
        }
    })
};