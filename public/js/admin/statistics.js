let socket=io.connect('https://localhost');

$('.btn.btn-default').on('click',(e)=>{
    "use strict";

    let date1=$('input')[0].value;
    let date2=$('input')[1].value;
    socket.emit('dates',[date1,date2]);
});

socket.on('result',(data)=>{
    console.log(data);
    $('thead').remove();
    $('tbody').remove();
    for (let i=0;i<data.length;i++){
        if (data[i]['birth']){
            console.log(data[i]['birth']);
            data[i]['birth']=new Date(data[i]['birth']).toLocaleDateString();
            console.log(data[i]['birth']);
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
})