let client=require('../../db');

module.exports.get=(req,res,next)=>{
    "use strict";
    client.query("SELECT * FROM "+ req.session.type+'s' +" WHERE id=$1",[req.session.userId],(err,result)=>{
        if (err){
            next(500)
        }
        else{
            console.log(result.rows)
            res.render('./user/profile',{
                user:result.rows[0]
            })
        }
    });

};