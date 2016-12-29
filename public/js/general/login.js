$('form').on('submit',(e)=>{
    "use strict";
    e.preventDefault();
    $.ajax({
        url:'/login',
        type:'POST',
        data:$('form').serialize(),
        statusCode:{
            303:()=>{
                window.location.href='/statements'
            },
            403:()=>{
                alert("Неправильный логин или пароль!");
            }
        }
    })
});
