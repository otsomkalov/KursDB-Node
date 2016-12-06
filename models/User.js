"use strict";
let client=require('../db');
let async=require('async');
class User{
    constructor (surname,name,patronymic,birth,passport,address,tel,log,pass,email){
        this.surname=surname;
        this.name=name;
        this.patronymic=patronymic;
        this.birth=birth;
        this.passport=passport;
        this.address=address;
        this.tel=tel;
        this.log=log;
        this.pass=pass;
        this.email=email;
    }

    reg(res){
        async.waterfall([
            (callback)=>{
                client.query("SELECT id FROM users WHERE passport=$1 OR email=$2 OR tel=$3 OR log=$4",
                    [this.passport,this.email,this.tel,this.log],(err,result)=>{
                        if (err){
                            callback(err)
                        }
                        else{
                            callback(null,result)
                        }
                    })
            },
            (arg,callback)=>{
                if (arg.rows.length!=0){
                    callback(500);
                }
                else{
                    client.query("INSERT INTO users VALUES('"+this.surname+"','"+this.name+"','"+this.patronymic+
                        "','"+this.birth+"','"+this.passport+"','"+this.address+
                        "','"+this.tel+"','"+this.log+"','"+this.pass+"','"+this.email+"');",(err,result)=>{
                            if (err){
                                callback(err)
                            }
                            else{
                                callback(null,result)
                            }
                        })
                }
            }
        ],(err,result)=>{
                if (err){
                    console.log(err);
                }
                else {
                    res.send(202);
                }
            }
        )
    }

    signin(req,res){
        async.waterfall(
            [
                (callback)=>{
                    client.query("SELECT id FROM users WHERE (log=$1 OR email=$2) AND pass=$3 ",[this.log,this.email,
                        this.pass],(err,result)=>{
                        if (err){

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
                        client.query("SELECT id FROM employees WHERE (log=$1 OR email=$2) AND pass=$3 ",[this.log,
                            this.email,this.pass],(err,result)=>{
                            if (err){

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
                        client.query("SELECT id FROM admins WHERE (log=$1 OR email=$2) AND pass=$3 ",[this.log,
                            this.email,this.pass],(err,result)=>{
                            if (err){

                            }
                            else{
                                callback(null,result.rows,'admin')
                            }
                        })
                    }
                }
            ],
            (err,result1,result2)=>{
                if (result1.length!=0){
                    req.session.userId=result1[0].id;
                    req.session.type=result2;
                    res.sendStatus(303);
                }
                else{
                    res.send(403);
                }
            });
    }
}
module.exports=User;