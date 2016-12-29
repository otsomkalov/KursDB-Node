let remove=(id)=>{
    "use strict";
    $.ajax({
        url:'/employees',
        type:'DELETE',
        data:{
            id:id
        },
        statusCode:{
            200:()=>{
                window.location.reload()
            },
            403:()=>{
                alert("Нельзя удалить данного сотрудника без нарушения целостности")
            }
        }
    });
};

let edit=(id)=>{
    "use strict";
    window.location.href+='/edit/'+id
}


