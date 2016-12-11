let async=require('async');
let client=require('../../db');

module.exports.get=(req,res,next)=>{
    "use strict";
    if (req.session.userId){
        res.redirect('/statements')
    }
    else{
        res.render('./general/login');
    }
};

module.exports.post=(req,res,next)=>{
    "use strict";
    let body=req.body;
    async.waterfall(
        [
            (callback)=>{
                client.query("SELECT id FROM users WHERE (log=$1 OR email=$2) AND pass=$3 ",[body.log,body.log,
                    body.pass],(err,result)=>{
                    if (err){
                        callback(err)
                    }
                    else{
                        callback(null,result.rows,'user')
                    }
                })
            },

            (arg1, arg2, callback)=>{
                if (arg1.length!=0){
                    callback(null,arg1,arg2);
                }
                else{
                    client.query("SELECT id FROM employees WHERE (log=$1 OR email=$2) AND pass=$3 ",[body.log,
                        body.log,body.pass],(err,result)=>{
                        if (err){
                            callback(err)
                        }
                        else{
                            callback(null,result.rows,'emp')
                        }
                    })
                }
            },

            (arg1, arg2, callback)=>{
                if (arg1.length!=0){
                    callback(null,arg1,arg2)
                }
                else{
                    client.query("SELECT id FROM admins WHERE (log=$1 OR email=$2) AND pass=$3 ",[body.log,
                        body.log,body.pass],(err,result)=>{
                        if (err){
                            callback(err)
                        }
                        else{
                            callback(null,result.rows,'admin')
                        }
                    })
                }
            }
        ],
        (err,result1,result2)=>{
            if (err){
                next(500)
            }
            else{
                if (result1.length!=0){
                    req.session.userId=result1[0].id;
                    req.session.type=result2;
                    res.sendStatus(303)
                }
                else{
                    res.sendStatus(403)
                }
            }
        });
    
};