"use strict";
const pg=require('pg');

const client=new pg.Client("postgres://postgres:123@127.0.0.1:5432/policestation");
client.connect();
/*let query=client.query(
    "CREATE TABLE users"
    +"("
    +"id integer NOT NULL,"+
    +"surname text,"
    +"name text,"
    +"patronymic text,"
    +"birth date,"
    +"passport text,"
    +"address text,"
    +"tel text,"
    +"log text,"
    +"pass text,"
    +"email text,"
    +"CONSTRAINT id PRIMARY KEY (id),"
    +"CONSTRAINT email UNIQUE (email),"
    +"CONSTRAINT log UNIQUE (log),"
    +"CONSTRAINT passport UNIQUE (passport),"
    +"CONSTRAINT tel UNIQUE (tel)"
    +")"
    +"WITH ("
        +"OIDS=FALSE"
    +");"
    +"ALTER TABLE users"
    +"OWNER TO postgres;",(err,res)=>{
        if (err){
            console.log(err)
        }
        else{
            console.log(res);
        }
});*/
module.exports=client;




