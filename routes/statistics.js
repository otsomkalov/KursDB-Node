let client=require('../db');
let async=require('async');

module.exports.get=(req,res,next)=>{
    "use strict";
    async.series([
        (callback)=>{
            client.query("SELECT COUNT(*) FROM admins",(err,result)=>{
                if (err){
                    callback(err)
                }
                else{
                    callback(err,result.rows[0]['count'])
                }
            })
        },
        (callback)=>{
            client.query("SELECT COUNT(*) FROM employees",(err,result)=>{
                if (err){
                    callback(err)
                }
                else{
                    callback(err,result.rows[0]['count'])
                }
            })
        },
        (callback)=>{
            client.query("SELECT COUNT(*) FROM users",(err,result)=>{
                if (err){
                    callback(err)
                }
                else{
                    callback(err,result.rows[0]['count'])
                }
            })
        },
        (callback)=>{
            client.query("SELECT COUNT(*) FROM statements",(err,result)=>{
                if (err){
                    callback(err)
                }
                else{
                    callback(err,result.rows[0]['count'])
                }
            })
        },
        (callback)=>{
            client.query("SELECT COUNT(*) FROM statements WHERE viewed=false AND accepted=false",(err,result)=>{
                if (err){
                    callback(err)
                }
                else{
                    callback(err,result.rows[0]['count'])
                }
            })
        },
        (callback)=>{
            client.query("SELECT COUNT(*) FROM statements WHERE viewed=true AND accepted=false",(err,result)=>{
                if (err){
                    callback(err)
                }
                else{
                    callback(err,result.rows[0]['count'])
                }
            })
        },
        (callback)=>{
            client.query("SELECT COUNT(*) FROM statements WHERE viewed=true AND accepted=true",(err,result)=>{
                if (err){
                    callback(err)
                }
                else{
                    callback(err,result.rows[0]['count'])
                }
            })
        },
    ],
        (err,results)=>{
        if (err){
            next(500)
        }
        else{
            res.render('statistics',{
                type:req.session.type,
                admins:results[0],
                employees:results[1],
                users:results[2],
                statements:results[3],
                notva:results[4],
                vnota:results[5],
                va:results[6]
            });
        }
        });

};