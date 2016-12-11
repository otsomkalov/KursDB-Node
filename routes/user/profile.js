let client=require('../../db');
let dateFormat=require('dateformat');

module.exports.get=(req,res,next)=>{
    "use strict";
    client.query("SELECT * FROM "+ req.session.type+'s' +" WHERE id=$1",[req.session.userId],(err,result)=>{
        if (err){
            next(500)
        }
        else{
            result.rows[0]['birth']=dateFormat(new Date(result.rows[0]['birth']),"yyyy-mm-dd");
            res.render('./user/profile',{
                type:req.session.type,
                user:result.rows[0]
            })
        }
    });
};

module.exports.post=(req,res,next)=>{
    "use strict";
    let body=req.body;
    client.query("UPDATE users SET surname=$1,name=$2,patronymic=$3,birth=$4,passport=$5,address=$6,tel=$7,pass=$8,email=$9 WHERE id=$10",
        [body.surname,body.name,body.patronymic,body.birth,body.passport,body.address,body.tel,body.pass,body.email,req.session.userId],
        (err,result)=>{
        if (err){
            next(500)
        }
        else{
            res.sendStatus(200);
        }
        })
};