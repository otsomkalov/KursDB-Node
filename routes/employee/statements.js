let client=require('../../db');
let async=require('async');
let dateFormat = require('dateformat');
const nodemailer=require('nodemailer');
const smtpConfig = {
    host: 'smtp.gmail.com',
    port: 465,
    secure: true,
    auth: {
        user: 'kurspolicestation@gmail.com', // Your email id
        pass: 'we34n8xza' // Your password
    }};
const transporter=nodemailer.createTransport(smtpConfig);

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
                        callback(null,arg[req.body.id]['id'])
                    }
                })
            },
            (arg,callback)=>{
                client.query("SELECT user_id FROM statements WHERE id=$1",[arg],(err,result)=>{
                    if (err){
                        callback(500)
                    }
                    else{
                        callback(null,result.rows[0].user_id,arg);
                    }
                })
            },
            (arg1,arg2,callback)=>{
                client.query("SELECT name,email FROM users WHERE id=$1",[arg1],(err,result)=>{
                    if (err){
                        callback(500)
                    }
                    else{
                        let mailOptions = {
                            from: '"Police Station" <kurspolicestation@gmail.com>', // sender address
                            to: result.rows[0].email, // list of receivers
                            subject: 'Ваше заявление # ' + arg2 + ' просмотрено!', // Subject line
                            text: 'Здравствуйте, ' + result.rows[0].name+'. Ваше заявление №' + arg2+' просмотрено! Перейдите на сайт за дополнительной информацией', // plaintext body
                        };
                        transporter.sendMail(mailOptions, function(error, info){
                            if(error){
                                callback(500)
                            }
                        });
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
                        callback(null,arg[req.body.id]['id'])
                    }
                })
            },
            (arg,callback)=>{
                client.query("SELECT user_id FROM statements WHERE id=$1",[arg],(err,result)=>{
                    if (err){
                        callback(500)
                    }
                    else{
                        callback(null,result.rows[0].user_id,arg);
                    }
                })
            },
            (arg1,arg2,callback)=>{
                client.query("SELECT name,email FROM users WHERE id=$1",[arg1],(err,result)=>{
                    if (err){
                        callback(500)
                    }
                    else{
                        let mailOptions = {
                            from: '"Police Station" <kurspolicestation@gmail.com>', // sender address
                            to: result.rows[0].email, // list of receivers
                            subject: 'Ваше заявление # ' + arg2 + ' просмотрено и принято!', // Subject line
                            text: 'Здравствуйте, ' + result.rows[0].name+'. Ваше заявление №' + arg2+' просмотрено и принято! Перейдите на сайт за дополнительной информацией', // plaintext body
                        };
                        transporter.sendMail(mailOptions, function(error, info){
                            if(error){
                                callback(500)
                            }
                        });
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
