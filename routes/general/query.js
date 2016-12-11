let client=require('../../db');
let io=require('socket.io');

module.exports.get=(req,res,next)=>{
    "use strict";
    res.render('general/query',{
        type:req.session.type
    })
};

module.exports.post=(req,res,next)=>{
    "use strict";
    client.query("$1",[req.body.text],(err,result)=>{
        if(err){

        }
    })
};

module.exports.socket=(socket)=>{
    "use strict";
    socket.on('query',(query)=>{
        client.query(query,(err,result)=>{
            if (err){
                socket.emit('result',err.message)
            }
            else{
                socket.emit('result',result.rows)
            }
        })
    })
};