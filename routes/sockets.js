module.exports=(socket)=>{
    "use strict";
    require('./general/query').socket(socket);
    require('./admin/statistics').socket(socket);
};