let login=()=>{
    "use strict";
    let log=$('.email')[0].value;
    $.ajax({
        url:'/login',
        type:'POST',
        data:{
            log:log,
            email:log,
            pass:$('.pass')[0].value
        },
        statusCode:{
            200:()=> {
                window.location.href = '/statements'
            },
            403:()=>{
                alert('Не вошли')
            }
        }
    });
};

let register=()=>{
    "use strict";
    window.location.href='/register'
};