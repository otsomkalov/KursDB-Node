let async=require('async');
let client=require('../../db');
let dateFormat=require('dateformat');

module.exports.get=(req,res,next)=>{
    "use strict";
    client.query("SELECT * FROM employees WHERE id=$1",[req.params.id],(err,result)=>{
        if (err){
            next(404)
        }
        else{
            result.rows[0]['birth']=dateFormat(new Date(result.rows[0]['birth']),"yyyy-mm-dd");
            res.render('./admin/edit',{
                type:req.session.type,
                user:result.rows[0]
            })
        }
    });
};

module.exports.post=(req,res,next)=>{
    "use strict";
    let body=req.body;
    client.query("UPDATE employees SET surname=$1,name=$2,patronymic=$3,birth=$4,passport=$5,ticket=$6,address=$7,tel=$8,pass=$9,email=$10 WHERE id=$11",
        [body.surname,body.name,body.patronymic,body.birth,body.passport,body.ticket,body.address,body.tel,body.pass,body.email,req.session.userId],
        (err,result)=>{
            if (err){
                next(500)
            }
            else{
                res.sendStatus(200);
            }
        })
};