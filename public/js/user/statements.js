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

let print=(id)=>{
    "use strict";
    window.location.href='/statements/'+id
};

$('.textarea').on('input',(e)=>{
    "use strict";
    $.ajax({
        url:'/statements',
        type:'PUT',
        data:{
            text:e.target.value,
            id:e.target.id
        }
    })
});

$('.add-btn').on('click',(e)=>{
    "use strict";
    window.location.href+='/add';
});

$('.show').on('click',(e)=>{
    "use strict";
    let options=$('option:selected');
    let option1=options[0].value;
    let option2=options[1].value;
    switch (option1){
        case "Просмотрено":option1=true;break;
        case "Не просмотрено":option1=false;break;
        default:option1="all";
    }
    switch (option2){
        case "Принято":option2=true;break;
        case "Не принято":option2=false;break;
        default:option2="all";
    }
    let view=$('.view');
    let acc=$('.acc');
    for (let i=0;i<view.length;i++){
        $('#st'+i)[0].style.display="block";
    }

    for (let i=0;i<view.length;i++){
        switch (option1){
            case true:
                if (view[i].classList.contains('glyphicon-minus')){
                    $('#st'+i)[0].style.display="none";
                }
                break;
            case false:
                if (view[i].classList.contains('glyphicon-ok')){
                    $('#st'+i)[0].style.display="none";
                }
                break;
            default:break;
        }
    }

    for (let i=0;i<acc.length;i++){
        switch (option2){
            case true:
                if (acc[i].classList.contains('glyphicon-minus')){
                    $('#st'+i)[0].style.display="none";
                }
                break;
            case false:
                if (acc[i].classList.contains('glyphicon-ok')){
                    $('#st'+i)[0].style.display="none";
                }
                break;
            default:break;
        }
    }

    let inputs=$('input');
    let date1=new Date(inputs[0].value);
    let date2=new Date(inputs[1].value);
    let dates=$('.dates');
    for (let i=0;i<dates.length;i++){
        if (date1){
            if (new Date(dates[i].innerText)<date1){
                $('#st'+i)[0].style.display="none";
            }
        }
    }

    for (let i=0;i<dates.length;i++){
        if (date2){
            if (new Date(dates[i].innerText)>date2){
                $('#st'+i)[0].style.display="none";
            }
        }
    }
});