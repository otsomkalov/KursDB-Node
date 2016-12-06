let remove=(id)=>{
    "use strict";
    $.ajax({
        url:'/employees',
        type:'delete',
        data:{
            id:id
        },
        statusCode:{
            200:()=>{
                window.location.reload()
            }
        }
    })
};