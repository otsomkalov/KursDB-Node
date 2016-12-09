let remove=(id)=>{
    "use strict";
    $.ajax({
        url:'/employee',
        type:'delete',
        data:{
            id:id
        },
        statusCode:{
            303:()=>{
                window.location.reload()
            }
        }
    })
};