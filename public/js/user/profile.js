$('form').on('submit',(e)=>{
    "use strict";
    e.preventDefault();
    $.ajax({
        url:'/profile',
        type:'POST',
        data:$('form').serialize(),
        statusCode:{
            200:()=>{
                alert('Данные успешно изменены');
                window.location.href="/statements"
            }
        }
    })
});