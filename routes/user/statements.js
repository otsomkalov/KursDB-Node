let client=require('../../db');
let async=require('async');
let dateFormat = require('dateformat');

module.exports.get=(req,res,next)=>{
    "use strict";
    client.query("SELECT text,viewed,accepted,date FROM statements WHERE user_id=$1 ORDER BY date DESC",[req.session.userId],(err,result)=>{
        if (err){
            next(500);
        }
        else{
            for (let i=0;i<result.rows.length;i++){
                result.rows[i]['date']=dateFormat(new Date(result.rows[i]['date']),"dd/mm/yyyy");
            }

            res.render('./user/statements',{
                type:req.session.type,
                statements:result.rows,
            });
        }
    });
};

module.exports.delete=(req,res,next)=>{
    "use strict";
    async.waterfall([
            (callback)=>{
                client.query("SELECT id FROM statements WHERE user_id=$1 ORDER BY date DESC",[req.session.userId],(err,result)=>{
                    if (err){
                        callback(500)
                    }
                    else{
                        callback(null,result.rows)
                    }
                })
            },
            (arg,callback)=>{
                client.query("DELETE FROM statements WHERE id=$1",[arg[req.body.id]['id']],(err,result)=>{
                    if (err){
                        callback(500)
                    }
                    else{
                        callback(null);
                    }
                })
            }
    ],
        (err)=>{
            if (err){
                next(err)
            }
            else{
                res.sendStatus(200);
            }
    });

};

module.exports.put=(req,res,next)=>{
    "use strict";
    async.waterfall([
        (callback)=>{
            client.query("SELECT id FROM statements WHERE user_id=$1 ORDER BY date DESC",[req.session.userId],(err,result)=>{
                if (err){
                    callback(500)
                }
                else{
                    callback(null,result.rows)
                }
            })
        },
        (arg,callback)=>{
            client.query("UPDATE statements SET accepted=false,emp_id=null,viewed=false,text=$1,date=$2 WHERE id=$3",
                [req.body.text,new Date().toLocaleString(),arg[req.body.id]['id']],(err,result)=>{
                if (err){
                    callback(err)
                }
                else{
                    callback(null)
                }
            })}
        ],
            (err)=>{
            if (err){
                next(500)
            }
            else{
                res.sendStatus(202)
            }
    })
};

