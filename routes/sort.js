let client=require('../db');

module.exports.post=(req,res,next)=>{
    "use strict";
    let option1;
    let option2;
    switch (req.body.option1){
        case "Принято":{
            option1=true;
            break;
        }
        case "Не принято":{
            option1=false;
            break;
        }
    }

    switch (req.body.option2){
        case "Принято":{
            option2=true;
            break;
        }
        case "Не принято":{
            option2=false;
            break;
        }
    }
    if (option1 && option2){
        client.query("SELECT text,viewed,accepted FROM statements WHERE (viewed=$1 AND accepted=$2) AND user_id=$2 ORDER BY id",[option1,option2,req.session.userId],(err,result)=>{
            if(err){
                console.log(err);
            }
            else{
                console.log(result);
                res.render('sort',{
                    type:req.session.type,
                    statements:result.rows
                })
            }
        })
    }
    else{
        if (option1){
            client.query("SELECT text,viewed,accepted FROM statements WHERE (viewed=$1 AND accepted=TRUE OR FALSE) AND user_id=$2 ORDER BY id",[option1,req.session.userId],(err,result)=>{
                if(err){
                    console.log(err);
                }
                else{
                    console.log(result);
                    res.render('sort',{
                        type:req.session.type,
                        statements:result.rows
                    })
                }
            })
        }
        else{
            client.query("SELECT text,viewed,accepted FROM statements WHERE (viewed=TRUE OR FALSE AND accepted=$1) AND user_id=$2 ORDER BY id",[option2,req.session.userId],(err,result)=>{
                if(err){
                    console.log(err);
                }
                else{
                    console.log(result);
                    res.render('sort',{
                        type:req.session.type,
                        statements:result.rows
                    })
                }
            })
        }
    }
};