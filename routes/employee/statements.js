let client=require('../../db');
let async=require('async');
let dateFormat = require('dateformat');

module.exports.get=(req,res,next)=>{
    "use strict";
    client.query(`SELECT statements.text,statements.viewed,statements.accepted,statements.date,users.surname,users.name,users.patronymic 
    FROM statements,users 
    WHERE statements.user_id=users.id
    ORDER BY date`,
        (err,result)=>{
        if (err){
            next(500);
        }
        else{
            for (let i=0;i<result.rows.length;i++){
                result.rows[i]['date']=dateFormat(new Date(result.rows[i]['date']),"dd/mm/yyyy");
            }
            res.render('./employee/statements',{
                type:req.session.type,
                statements:result.rows,
            });
        }
    });
};

module.exports.post=(req,res,next)=> {
    "use strict";
    async.waterfall([
            (callback) => {
                client.query("SELECT id FROM statements ORDER BY date", (err, result) => {
                    if (err) {
                        callback(500);
                    }
                    else {
                        callback(null, result.rows)
                    }
                });
            },
            (arg, callback) => {
                client.query("UPDATE statements SET viewed=true,emp_id=$1 WHERE id=$2",
                    [req.session.userId, arg[req.body.id]['id']], (err, result) => {
                    if (err) {
                        callback(500)
                    }
                    else {
                        callback(null)
                    }
                })
            }
        ],
        (err) => {
            if (err) {
                next(500)
            }
            else {
                res.sendStatus(200);
            }
        })
};

module.exports.put=(req,res,next)=>{
    "use strict";
    async.waterfall([
            (callback)=>{
                client.query("SELECT id FROM statements ORDER BY date",(err,result)=> {
                    if (err){
                        callback(err)
                    }
                    else{
                        callback(null,result.rows)
                    }
                });
            },
            (arg,callback)=>{
                client.query("UPDATE statements SET viewed=true,accepted=true,emp_id=$1 WHERE id=$2",
                    [req.session.userId,arg[req.body.id]['id']],(err,result)=>{
                    if (err){
                        callback(err)
                    }
                    else{
                        callback(null)
                    }
                })
            }
        ],
        (err)=>{
            if (err){
                next(500)
            }
            else{
                res.sendStatus(200)
            }
        })
};
