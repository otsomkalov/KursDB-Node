let remove=(id)=>{
    "use strict";
    $.ajax({
        url:'/employee',
        type:'delete',
        data:{
            id:id
        },
        statusCode:{
            303:()=>{
                window.location.reload()
            }
        }
    })
};

$('.accept').on('click',(e)=>{
    "use strict";
    e.preventDefault();
    $.ajax({
        url:'/statements',
        type:'PUT',
        data:{
            id:e.target.id
        }
    });
    $('.view')[e.target.id].classList="glyphicon glyphicon-ok btn btn-link view";
    $('.accept')[e.target.id].classList="glyphicon glyphicon-ok btn btn-link accept"
});

$('.view').on('click',(e)=>{
    "use strict";
    e.preventDefault();
    $.ajax({
        url:'/statements',
        type:'POST',
        data:{
            id:e.target.id
        }
    });
    $('.view')[e.target.id].classList="glyphicon glyphicon-ok btn btn-link view";
});



let surname=[];
let name=[];
let patronymic=[];
let fios=$('.panel-heading');
for (let i=0;i<fios.length;i++){
    let fio=fios[i].innerText.split(' ');
    surname.push(fio[0]);
    name.push(fio[1]);
    patronymic.push(fio[2])
}

let search=()=>{
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
    let acc=$('.accept');
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
    let date1=new Date(inputs[3].value);
    let date2=new Date(inputs[4].value);
    let dates=$('.dates');
    for (let i=0;i<dates.length;i++){
        if (date1){
            let date=dates[i].innerText.split('/');
            if (new Date(date[2],date[1]-1,date[0])<=date1){
                $('#st'+i)[0].style.display="none";
            }
        }
    }

    for (let i=0;i<dates.length;i++){
        let date=dates[i].innerText.split('/');
        if (date2){
            if (new Date(date[2],date[1]-1,date[0])>=date2){
                $('#st'+i)[0].style.display="none";
            }
        }
    }
    let surnameS=$('.surname')[0].value;
    let nameS=$('.name')[0].value;
    let patronymicS=$('.patronymic')[0].value;
    let sts=$('.panel');
    let stsArr=[];
    for (let i=0;i<sts.length;i++){
        if (sts[i].style.display!="none"){
            stsArr.push(i)
        }
    }

    for (let i=0;i<stsArr.length;i++){
        if (surname[stsArr[i]].toLowerCase().indexOf(surnameS.toLowerCase())==-1 || name[stsArr[i]].toLowerCase().indexOf(nameS.toLowerCase())==-1 || patronymic[stsArr[i]].toLowerCase().indexOf(patronymicS.toLowerCase())==-1 ){
            fios[stsArr[i]].parentNode.style.display="none"
        }
        else{
            fios[stsArr[i]].parentNode.style.display="block"
        }
    }
};

$('input.surname').on('input',search);

$('input.form-control.name').on('input',search);

$('input.form-control.patronymic').on('input',search);

$('.show').on('click',search);