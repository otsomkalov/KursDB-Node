let client=require('../../db');
let async=require('async');
let dateFormat = require('dateformat');

module.exports.get=(req,res,next)=>{
    "use strict";
    async.series([
        (callback)=>{
            client.query("SELECT COUNT(*) FROM admins",(err,result)=>{
                if (err){
                    callback(err)
                }
                else{
                    callback(null,result.rows[0]['count'])
                }
            })
        },
        (callback)=>{
            client.query("SELECT COUNT(*) FROM employees",(err,result)=>{
                if (err){
                    callback(err)
                }
                else{
                    callback(null,result.rows[0]['count'])
                }
            })
        },
        (callback)=>{
            client.query("SELECT COUNT(*) FROM statements",(err,result)=>{
                if (err){
                    callback(err)
                }
                else{
                    callback(null,result.rows[0]['count'])
                }
            })
        },
        (callback)=>{
            client.query("SELECT COUNT(*) FROM users",(err,result)=>{
                if (err){
                    callback(err)
                }
                else{
                    callback(null,result.rows[0]['count'])
                }
            })
        },
        (callback)=>{
            client.query("SELECT COUNT(*) FROM statements WHERE viewed=false AND accepted=false",(err,result)=>{
                if (err){
                    callback(err)
                }
                else{
                    callback(null,result.rows[0]['count'])
                }
            })
        },
        (callback)=>{
            client.query("SELECT COUNT(*) FROM statements WHERE viewed=true AND accepted=false",(err,result)=>{
                if (err){
                    callback(err)
                }
                else{
                    callback(null,result.rows[0]['count'])
                }
            })
        },
        (callback)=>{
            client.query("SELECT COUNT(*) FROM statements WHERE viewed=true AND accepted=true",(err,result)=>{
                if (err){
                    callback(err)
                }
                else{
                    callback(null,result.rows[0]['count'])
                }
            })
        },
        (callback)=>{
            client.query(`SELECT 
            users.id,users.surname,users.name,users.patronymic,users.birth,users.passport,users.address,users.tel,
            users.email,COUNT(statements.id)
            FROM users,statements 
            WHERE statements.user_id=users.id 
            GROUP BY users.id
            ORDER BY users.id`,(err,result)=>{
                if (err){
                    callback(err)
                }
                else{
                    callback(null,result.rows)
                }
            })
        }
    ],
        (err,results)=>{
        if (err){
            next(500)
        }
        else{
            for (let i=0;i<results[7].length;i++){
                results[7][i]['birth']=dateFormat(new Date(results[7][i]['birth']),"dd/mm/yyyy");
            }
            res.render('./admin/statistics',{
                type:req.session.type,
                adminsCount:results[0],
                employeesCount:results[1],
                usersCount:results[2],
                statementsCount:results[3],
                notva:results[4],
                vnota:results[5],
                va:results[6],
                userStat:results[7]
            });
        }
        });
};

module.exports.socket=(socket)=>{
    "use strict";
    socket.on('dates',(dates)=>{
        client.query(`SELECT
            users.id,users.surname,users.name,users.patronymic,users.birth,users.passport,users.address,users.tel,
            users.email,COUNT(statements.id)
            FROM users,statements
            WHERE statements.user_id=users.id AND (statements.date BETWEEN $1 AND $2)
            GROUP BY users.id
            ORDER BY users.id`,[dates[0],dates[1]],(err,result)=>{
            if (err){
                socket.emit('error',err)
            }
            else{
                socket.emit('result',result.rows)
            }
        })
    })
};