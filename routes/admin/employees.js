let client=require('../../db');

module.exports.get=(req,res,next)=>{
    "use strict";
    if (req.session.type=="admin"){
        client.query("SELECT id,surname,name,patronymic,birth,passport,ticket,address,tel,email FROM employees ORDER BY id",(err,result)=>{
            if (err){
                next(500)
            }
            else{
                for (let person in result.rows){
                    result.rows[person]['birth']=new Date(result.rows[person]['birth']).toLocaleDateString();
                }
                res.render('./admin/employees',{
                    type:req.session.type,
                    employees:result.rows
                });
            }
        });
    }
    else{
        res.redirect('/login');
    }
};

module.exports.delete=(req,res,next)=>{
    "use strict";
    client.query("DELETE FROM employees WHERE id=$1",[req.body.id],(err,result)=>{
        if (err){
            res.send(403)
        }
        else {
            res.send(200)
        }
    })
};