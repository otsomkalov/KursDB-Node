let client=require('../db');
let async=require('async');

module.exports.get=(req,res,next)=>{
    "use strict";
    if (req.session.userId){
        if (req.session.type=="user"){
            client.query("SELECT text,viewed,accepted FROM statements WHERE user_id=$1 ORDER BY id",[req.session.userId],(err,result)=>{
                if (err){
                    next(500);
                }
                else{
                    res.render('statements',{
                        type:req.session.type,
                        statements:result.rows,
                    });
                }
            });
        }
        else{
            if (req.session.type=="emp"){
                client.query("SELECT text,viewed,accepted FROM statements ORDER BY id",(err,result)=>{
                    if (err){
                        next(500);
                    }
                    else{
                        res.render('statements',{
                            type:req.session.type,
                            statements:result.rows,
                        });
                    }
                });
            }
            else{
                res.redirect('/employees');
            }
        }
    }
    else{
        res.redirect('/');
    }
};

module.exports.post=(req,res,next)=>{
    "use strict";
    if (req.session.type=="user"){
        client.query("INSERT INTO statements VALUES($1,$2)",[req.body.text,req.session.userId],(err,result)=>{
            if (err){
                next(500)
            }
            else{
                res.sendStatus(201);
            }
        })
    }
    else{
        async.waterfall([
                (callback)=>{
                    client.query("SELECT text,viewed,accepted,id FROM statements ORDER BY id",(err,result)=>{
                        if (err){
                            callback(500);
                        }
                        else{
                            callback(null,result.rows)
                        }
                    });
                },
                (arg,callback)=>{
                    client.query("UPDATE statements SET viewed=true,emp_id=$1 WHERE id=$2",[req.session.userId,arg[req.body.id]['id']],(err,result)=>{
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
    }
};

module.exports.delete=(req,res,next)=>{
    "use strict";
    async.waterfall([
            (callback)=>{
                client.query("SELECT id FROM statements WHERE user_id=$1",[req.session.userId],(err,result)=>{
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
    if (req.session.type=="user"){
        async.waterfall([
            (callback)=>{
                client.query("SELECT id FROM statements WHERE user_id=$1 ORDER BY id",[req.session.userId],(err,result)=>{
                    if (err){
                        callback(500)
                    }
                    else{
                        callback(null,result.rows)
                    }
                })
            },
            (arg,callback)=>{
                client.query("UPDATE statements SET accepted=false,emp_id=null,viewed=false,text=$1 WHERE id=$2",
                [req.body.text,arg[req.body.id]['id']],(err,result)=>{
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
                res.sendStatus(202)
            }
            })

    }
    else{
        async.waterfall([
                (callback)=>{
                    client.query("SELECT id FROM statements ORDER BY id",(err,result)=> {
                        if (err){
                            callback(err)
                        }
                        else{
                            callback(null,result.rows)
                        }
                    });
                },
                (arg,callback)=>{
                    client.query("UPDATE statements SET viewed=true,accepted=true,emp_id=$1 WHERE id=$2",[req.session.userId,arg[req.body.id]['id']],(err,result)=>{
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
    }
};

