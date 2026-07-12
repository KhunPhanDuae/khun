// =================================
// Market Research Module
// =================================


async function loadMarketData(){


try{


const response =
await fetch(API_URL);



const data =
await response.json();



let location = [];

let trend = [];

let customer = [];

let competitor = [];

let risk = [];




data.forEach(item=>{


switch(item.Category){


case "Location":

location.push(item);

break;


case "Trend":

trend.push(item);

break;


case "Customer":

customer.push(item);

break;


case "Competitor":

competitor.push(item);

break;


case "Risk":

risk.push(item);

break;


}


});





document.getElementById("locationData")
.innerHTML =
location.length+" Records";



document.getElementById("trendData")
.innerHTML =
trend.length+" Records";



document.getElementById("customerData")
.innerHTML =
customer.length+" Records";



document.getElementById("competitorData")
.innerHTML =
competitor.length+" Records";



document.getElementById("riskAnalysis")
.innerHTML =
risk.length+" Records";




}

catch(error){

console.log(error);

}


}



loadMarketData();
