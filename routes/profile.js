module.exports.get=(req,res,next)=>{
    "use strict";
    let client=require('../db');
    client.query("SELECT * FROM "+ req.session.type+'s' +" WHERE id=$1",[req.session.user_id],(err,result)=>{
        if (err){

        }
        else{
            res.render('profile',{
                user:result.rows[0]
            })
        }
    });

};