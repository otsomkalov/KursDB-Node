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

$('.accept').on('click',(e)=>{
    "use strict";
    e.preventDefault();
    $.ajax({
        url:'/statements',
        type:'PUT',
        data:{
            id:e.target.id
        }
    });
    $('.view')[e.target.id].classList="glyphicon glyphicon-ok btn btn-link";
    $('.accept')[e.target.id].classList="glyphicon glyphicon-ok btn btn-link"
});

$('.view').on('click',(e)=>{
    "use strict";
    e.preventDefault();
    $.ajax({
        url:'/statements',
        type:'POST',
        data:{
            id:e.target.id
        }
    });
    $('.view')[e.target.id].classList="glyphicon glyphicon-ok btn btn-link";
    $('.accept')[e.target.id].classList="glyphicon glyphicon-ok btn btn-link"
});