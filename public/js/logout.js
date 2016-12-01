let logout=()=>{
    "use strict";
    $.ajax({
        type:"post",
        data:{
            type:"logout"
        },
        statusCode:{
            200:()=>{
                window.location.href='/';
            }
        }
    })
};