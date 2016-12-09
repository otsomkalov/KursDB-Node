let client=require('../../db');
let async=require('async');

module.exports.get=()=>{
    "use strict";
    client.query("SELECT text,viewed,accepted FROM user ORDER BY id",(err,result)=>{
        if (err){
            next(500);
        }
        else{
            res.render('./employee/user',{
                type:req.session.type,
                statements:result.rows,
            });
        }
    });
};

module.exports.put=()=>{
    "use strict";
    async.waterfall([
            (callback)=>{
                client.query("SELECT id FROM user ORDER BY id",(err,result)=> {
                    if (err){
                        callback(err)
                    }
                    else{
                        callback(null,result.rows)
                    }
                });
            },
            (arg,callback)=>{
                client.query("UPDATE user SET viewed=true,accepted=true,emp_id=$1 WHERE id=$2",[req.session.userId,arg[req.body.id]['id']],(err,result)=>{
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

module.exports.post=()=>{
    "use strict";
    async.waterfall([
            (callback)=>{
                client.query("SELECT text,viewed,accepted,id FROM user ORDER BY id",(err,result)=>{
                    if (err){
                        callback(500);
                    }
                    else{
                        callback(null,result.rows)
                    }
                });
            },
            (arg,callback)=>{
                client.query("UPDATE user SET viewed=true,emp_id=$1 WHERE id=$2",[req.session.userId,arg[req.body.id]['id']],(err,result)=>{
                    if (err){
                        callback(500)
                    }
                    else{
                        callback(null)
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
        })
;