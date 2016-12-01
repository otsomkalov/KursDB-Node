module.exports.get=(req,res,next)=>{
    "use strict";
    let client=require('../db');
    client.query("SELECT * FROM "+ req.session.type+'s' +" WHERE name=$1",[req.session.name],(err,result)=>{
        if (err){

        }
        else{
            res.render('profile',{
                user:result.rows[0]
            })
        }
    });

};