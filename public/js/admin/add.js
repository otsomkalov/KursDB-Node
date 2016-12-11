$('form').on('submit',(e)=>{
    "use strict";
    e.preventDefault();
    $.ajax({
        url:'/employees/add',
        type:'POST',
        data:$('form').serialize(),
        statusCode:{
            303:()=>{
                alert('Работник успешно добавлен!');
                window.location.href="/employees"
            },
            406:()=>{
                $('form').append('<div class="alert alert-danger">Вы ввели неправильные данные</div>')
            }
        }
    })
});