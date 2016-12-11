let async=require('async');
let client=require('../../db');

module.exports.get=(req,res,next)=>{
    "use strict";
    res.render('./user/register');
};

module.exports.post=(req,res,next)=>{
    "use strict";
    let body=req.body;
    async.series([
        (callback)=>{
            client.query("SELECT id FROM users WHERE passport=$1 OR email=$2 OR tel=$3 OR log=$4",
                [body.passport,body.log,body.tel,body.log],(err,result)=>{
                    if (err){
                        callback(err)
                    }
                    else{
                        callback(null,result)
                    }
                })
        },
        (callback)=>{
            client.query("SELECT id FROM employees WHERE passport=$1 OR email=$2 OR tel=$3 OR log=$4",
                [body.passport,body.log,body.tel,body.log],(err,result)=>{
                    if (err){
                        callback(err)
                    }
                    else{
                        callback(null,result)
                    }
                })
        },
        (callback)=>{
            client.query("SELECT id FROM admins WHERE passport=$1 OR email=$2 OR tel=$3 OR log=$4",
                [body.passport,body.log,body.tel,body.log],(err,result)=>{
                    if (err){
                        callback(err)
                    }
                    else{
                        callback(null,result)
                    }
                })
        }
    ],(err,result)=>{
            if (err){
                console.log(err);
            }
            else {
                for (let item in result){
                    if (result[item].rows.length!=0){
                        res.sendStatus(406);
                        return
                    }
                }
                client.query("INSERT INTO users VALUES('"+body.surname+"','"+body.name+"','"+body.patronymic+
                    "','"+body.birth+"','"+body.passport+"','"+body.address+
                    "','"+body.tel+"','"+body.log+"','"+body.pass+"','"+body.email+"');",(err,result)=>{
                    if (err){
                        next(500)
                    }
                    else{
                        res.sendStatus(202);
                    }
                })
            }
        }
    );
};