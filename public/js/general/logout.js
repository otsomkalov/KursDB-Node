let logout=()=>{
    "use strict";
    $.ajax({
        url:'/logout',
        type:'DELETE'
    })
};