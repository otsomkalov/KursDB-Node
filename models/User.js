"use strict";
let client=require('../db');
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

    reg(response){
        client.query("SELECT MAX(ID) FROM USERS",(err,res)=>{
            client.query("INSERT INTO users VALUES('"+this.surname+"','"+this.name+"','"+this.patronymic+
                "','"+this.birth+"','"+this.passport+"','"+this.address+
                "','"+this.tel+"','"+this.log+"','"+this.pass+"','"+this.email+"');",
                (err,res)=>{
                if (err){
                    response.send(406)
                }
                else{
                    response.send(200)
                }
            });
        })
    }

    signin(req,response){
        client.query("SELECT name FROM users WHERE (log=$1 OR email=$2) AND pass=$3 ",[this.log,this.email,this.pass],(err,res)=>{
            if (res.rows[0] && !err){
                req.session.name=res.rows[0].name;
                req.session.type="user";
                response.send(200)
            }
            else{
                client.query("SELECT name FROM employees WHERE (log=$1 OR email=$2) AND pass=$3 ",[this.log,this.email,this.pass],(err,res)=>{
                    if (res.rows[0] && !err){
                        req.session.name=res.rows[0].name;
                        req.session.type="emp";
                        response.send(200)
                    }
                    else{
                        client.query("SELECT name FROM admins WHERE (log=$1 OR email=$2) AND pass=$3 ",[this.log,this.email,this.pass],(err,res)=>{
                            if (res.rows[0] && !err){
                                req.session.name=res.rows[0].name;
                                req.session.type="admin";
                                response.redirect('/employees')
                            }
                            else{
                                response.send(403);
                            }});
                    }});
        }});
    }
}
module.exports=User;