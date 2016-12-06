let add=()=>{
    "use strict";
    $('.add-btn')[0].style.visibility='hidden';
    $('.submit')[0].style.visibility='visible';
};

let change=(id)=>{
    "use strict";
    let st=$('#st'+id);
    st.after('<input class="form-control", id="text" value="'+st[0].innerText+'">');
    st.remove();
    let change=$('.change');
    let remove=$('.remove');
    let td=$('#td'+id);
    change[id].remove();
    remove[id].remove();
    td.append('<span class="glyphicon glyphicon-ok btn btn-link ok" onclick="submitChanges('+id+')"></span>');
    td.append('<span class="glyphicon glyphicon-remove btn btn-link cancel" onclick="cancel('+id+')"></span>');
};

let cancel=(id)=>{
    "use strict";
    let text=$('#text');
    text.after('<p id="st'+id+'">'+text[0].value+'</p>');
    text.remove();
    let ok=$('.ok');
    let cancel=$('.cancel');
    ok.remove();
    cancel.remove();
    let td=$('#td'+id);
    td.append('<span class="glyphicon glyphicon-pencil btn btn-link change" onclick="change('+id+')"></span>');
    td.append('<span class="glyphicon glyphicon-remove btn btn-link remove" onclick="remove('+id+')"></span>');
};

let submitChanges=(id)=>{
    "use strict";
    $.ajax({
        url:'/statements',
        type:'PUT',
        data:{
            id:id,
            text:$('#text')[0].value
        },
        statusCode:{
            202:()=>{
                window.location.reload()
            }
        }
    })
};

$('form').on('submit',(e)=>{
    "use strict";
    e.preventDefault();
    $.ajax({
        url:'/statements',
        type: 'POST',
        data:$('form').serialize(),
        statusCode:{
            201:()=>{
                window.location.reload();
            }
        }
    })
});

let remove=(id)=>{
    "use strict";
    $.ajax({
        url:'/statements',
        type:'DELETE',
        data:{
            id:id
        },
        statusCode:{
            200:()=>{
                window.location.reload()
            }
        }
    })
};

let viewed=(id)=>{
    "use strict";
    $.ajax({
        url:'/statements',
        type:'POST',
        data:{
            id:id
        },
        statusCode:{
            200:()=>{
                window.location.reload()
            }
        }
    })
};

let accepted=(id)=>{
    "use strict";
    $.ajax({
        url:'/statements',
        type:'PUT',
        data:{
            id:id
        },
        statusCode:{
            200:()=>{
                window.location.reload()
            }
        }
    })
};

let show=()=>{
    "use strict";
    let options=$('option:selected');
    $.ajax({
        url:'/sort',
        type:'POST',
        data:{
            option1:options[0].innerText,
            option2:options[1].innerText
        }
    })
};

let print=(id)=>{
    "use strict";
    window.location.href='/statements/'+id
};