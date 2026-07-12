let businessChart;


function createChart(data){


const ctx =
document.getElementById("businessChart");



if(!ctx){

return;

}



if(businessChart){

businessChart.destroy();

}



businessChart =
new Chart(ctx,{


type:"bar",


data:{


labels:[

"Market",

"Customer",

"Competitor",

"Finance",

"Economy",

"Security"

],



datasets:[{

label:"BI Data",


data:data


}]


}


});


}
