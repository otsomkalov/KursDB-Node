let register=()=>{
    "use strict";
    let surname=$('.surname')[0];
    let name=$('.name')[0];
    let patronymic=$('.patronymic')[0];
    let birth=$('.birth')[0];
    let passport=$('.passport')[0];
    let address=$('.address')[0];
    let tel=$('.tel')[0];
    let log=$('.log')[0];
    let pass=$('.pass')[0];
    let email=$('.email')[0];

        $.ajax({
        url:'/register',
        type:'POST',
        data:{
            surname:surname.value,
            name:name.value,
            patronymic:patronymic.value,
            birth:birth.value,
            passport:passport.value,
            address:address.value,
            tel:tel.value,
            log:log.value,
            pass:pass.value,
            email:email.value
        },
        statusCode:{
            200:()=>{
                window.location.href='claims';
            },
            406:()=>{
                alert('Неправильные данные');
            }
        }
    })
};
let checkSurname=()=>{
    "use strict";
    let surname=$('.surname')[0];
    if (surname.value.match(/[A-Za-zА-Яа-я]/)){
        surname.parentNode.classList.add('has-success','has-feedback');
    }
    else{
        surname.parentNode.classList.add('has-error','has-feedback');
    }
};

let checkName=()=>{
    "use strict";
    let name=$('.name')[0];
    if (name.value.match(/[A-Za-zА-Яа-я]/)){
        name.parentNode.classList.add('has-success','has-feedback');
    }
    else{
        name.parentNode.classList.add('has-error','has-feedback');
    }
};

let checkPatr=()=>{
    "use strict";
    let patronymic=$('.patronymic')[0];
    if (patronymic.value.match(/[A-Za-zА-Яа-я]/)){
        patronymic.parentNode.classList.add('has-success','has-feedback');
    }
    else{
        patronymic.parentNode.classList.add('has-error','has-feedback');
    }
};

let checkBirth=()=>{
    "use strict";
    let birth=$('.birth')[0];
    let year=new Date(birth.value).getFullYear();
    if (year<=new Date().getFullYear() && year>=1940){
        birth.parentNode.classList.add('has-success','has-feedback');
    }
    else{
        birth.parentNode.classList.add('has-error','has-feedback');
    }
};

let checkPassport=()=>{
    "use strict";

};

let checkAddress=()=>{
    "use strict";

};

let checkTel=()=>{
    "use strict";

};

let checkLog=()=>{
    "use strict";

};

let checkPass=()=>{
    "use strict";

};

let checkEmail=()=>{
    "use strict";

};

