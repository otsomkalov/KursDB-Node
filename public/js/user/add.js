$('form').on('submit',(e)=>{
    "use strict";
    e.preventDefault();
    $.ajax({
        url:'/statements/add',
        type:'POST',
        data:$('form').serialize()
});