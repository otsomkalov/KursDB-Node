$('form').on('submit',(e)=> {
    "use strict";
    e.preventDefault();
    $.ajax({
        url: '/statements/add',
        type: 'POST',
        data: $('form').serialize(),
        statusCode:{
            303:()=>{
                alert('Заявление успешно добавлено!');
                window.location.href="/statements"
            }
        }
    });
});