$('form').on('submit',(e)=>{
    "use strict";
    e.preventDefault();
    $.ajax({
        url:window.location.href,
        type:'POST',
        data:$('form').serialize(),
        statusCode:{
            200:()=>{
                alert('Данные работника успешно изменены!');
                window.location.href="/employees"
            },
            406:()=>{
                $('form').append('<div class="alert alert-danger">Вы ввели неправильные данные</div>')
            }
        }
    })
});