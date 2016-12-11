$('.btn-link').on('click',(e)=>{
    "use strict";
    e.preventDefault();
    $.ajax({
        url:'/employees',
        type:'DELETE',
        data:{
            id:e.target.id
        },
        statusCode:{
            200:()=>{
                window.location.reload()
            }
        }
    });
});

