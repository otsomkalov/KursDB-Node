let socket=io.connect('https://localhost');

$('.btn.btn-default').on('click',(e)=>{
    "use strict";
    socket.emit('query',$('.form-control')[0].value);
    socket.on('result',(data)=>{
        if (typeof (data)!='string'){
            $('.result')[0].style.display="none";
            $('thead').remove();
            $('tbody').remove();
            for (let i=0;i<data.length;i++){
                if (data[i]['birth']){
                    data[i]['birth']=new Date(data[i]['birth']).toLocaleDateString();
                }
                if (i==0){
                    $('.table-bordered').append($('<thead>'));
                    $('thead').append($('<tr>'));
                    for (let field in data[i]){
                        $('tr:last').append($('<td>'));
                        $('td:last')[0].innerText=field;
                    }
                    $('.table-bordered').append($('<tbody>'));
                }
                $('tbody').append($('<tr>'));
                for (let field in data[i]){
                    $('tr:last').append($('<td>'));
                    $('td:last')[0].innerText=data[i][field];
                }
            }
        }
        else{
            $('table')[0].style.display="none";
            $('.result')[0].style.display="block";
            $('.result')[0].innerText=data;
        }
    })
});