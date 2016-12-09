let checkSurname=()=>{
    "use strict";
    let surname=$('.surname')[0];
    if (surname.value.match(/[A-Za-zА-Яа-я]/)){
        surname.parentNode.classList.remove('has-error','has-feedback');
        surname.parentNode.classList.add('has-success','has-feedback');
        return true;
    }
    else{
        surname.parentNode.classList.remove('has-success','has-feedback');
        surname.parentNode.classList.add('has-error','has-feedback');
        return false;
    }
};

let checkName=()=>{
    "use strict";
    let name=$('.name')[0];
    if (name.value.match(/[A-Za-zА-Яа-я]/)){
        name.parentNode.classList.remove('has-error','has-feedback');
        name.parentNode.classList.add('has-success','has-feedback');
        return true;
    }
    else{
        name.parentNode.classList.remove('has-success','has-feedback');
        name.parentNode.classList.add('has-error','has-feedback');
        return false;
    }
};

let checkPatr=()=>{
    "use strict";
    let patronymic=$('.patronymic')[0];
    if (patronymic.value.match(/[A-Za-zА-Яа-я]/)){
        patronymic.parentNode.classList.remove('has-error','has-feedback');
        patronymic.parentNode.classList.add('has-success','has-feedback');
        return true;
    }
    else{
        patronymic.parentNode.classList.remove('has-success','has-feedback');
        patronymic.parentNode.classList.add('has-error','has-feedback');
        return false;
    }
};

let checkBirth=()=>{
    "use strict";
    let birth=$('.birth')[0];
    let year=new Date(birth.value).getFullYear();
    if (year<=new Date().getFullYear() && year>=1940){
        birth.parentNode.classList.remove('has-error','has-feedback');
        birth.parentNode.classList.add('has-success','has-feedback');
        return true;
    }
    else{
        birth.parentNode.classList.remove('has-success','has-feedback');
        birth.parentNode.classList.add('has-error','has-feedback');
        return false;
    }
};

let checkPassport=()=>{
    "use strict";
    let passport=$('.passport')[0];
    if (passport.value.length==8 && passport.value.match(/[A-za-zА-Яа-я]/)){
        passport.parentNode.classList.remove('has-error','has-feedback');
        passport.parentNode.classList.add('has-success','has-feedback');
        return true;
    }
    else{
        passport.parentNode.classList.remove('has-success','has-feedback');
        passport.parentNode.classList.add('has-error','has-feedback');
        return false;
    }
};

let checkAddress=()=>{
    "use strict";
    let address=$('.address')[0];
    if (address.value.match(/[A-za-zА-Яа-я.,/]/)){
        address.parentNode.classList.remove('has-error','has-feedback');
        address.parentNode.classList.add('has-success','has-feedback');
        return true;
    }
    else{
        address.parentNode.classList.remove('has-success','has-feedback');
        address.parentNode.classList.add('has-error','has-feedback');
        return false;
    }
};

let checkTel=()=>{
    "use strict";
    let tel=$('.tel')[0];
    if (tel.value.match(/[0-9()+]/)){
        tel.parentNode.classList.remove('has-error','has-feedback');
        tel.parentNode.classList.add('has-success','has-feedback');
        return true;
    }
    else{
        tel.parentNode.classList.remove('has-success','has-feedback');
        tel.parentNode.classList.add('has-error','has-feedback');
        return false;
    }
};

let checkLog=()=>{
    "use strict";
    let log=$('.log')[0];
    if (log.value.length!=0){
        log.parentNode.classList.remove('has-error','has-feedback');
        log.parentNode.classList.add('has-success','has-feedback');
        return true;
    }
    else{
        log.parentNode.classList.remove('has-success','has-feedback');
        log.parentNode.classList.add('has-error','has-feedback');
        return false;
    }
};

let checkPass=()=>{
    "use strict";
    let pass=$('.pass')[0];
    if (pass.value.length!=0){
        pass.parentNode.classList.remove('has-error','has-feedback');
        pass.parentNode.classList.add('has-success','has-feedback');
        return true;
    }
    else{
        pass.parentNode.classList.remove('has-success','has-feedback');
        pass.parentNode.classList.add('has-error','has-feedback');
        return false;
    }
};

let checkEmail=()=>{
    "use strict";
    let email=$('.email')[0];
    if (email.value.match(/[A-za-z]/) && email.value.indexOf('@')!=-1){
        email.parentNode.classList.remove('has-error','has-feedback');
        email.parentNode.classList.add('has-success','has-feedback');
        return true;
    }
    else{
        email.parentNode.classList.remove('has-success','has-feedback');
        email.parentNode.classList.add('has-error','has-feedback');
        return false;
    }
};

$('form').on('submit',(e)=>{
    "use strict";
    e.preventDefault();
    $.ajax({
        url:'/register',
        type:'POST',
        data:$('form').serialize(),
        statusCode:{
            202:()=>{
                alert('Вы успешно зарегистрированы!');
                window.location.href='/login'
            },
            406:()=>{
                $('form').append('<div class="alert alert-danger">Вы ввели неправильные данные</div>')
            }
        }
    })
});