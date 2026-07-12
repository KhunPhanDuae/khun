// =================================
// Market Intelligence Score
// =================================


async function calculateMarketScore(){


try{


const response =
await fetch(API_URL);


const data =
await response.json();



let totalScore = 0;

let totalDemand = 0;

let totalRisk = 0;

let count = data.length;



data.forEach(item=>{


// Score

totalScore +=
Number(item.Score || 0);



// Demand

if(item.Demand=="High"){

totalDemand++;

}



// Risk

if(item.Risk=="High"){

totalRisk++;

}



});





let opportunity = 0;



if(count>0){

opportunity =
Math.round(
totalScore / count
);

}





document.getElementById(
"opportunityScore"
)
.innerHTML =
opportunity+"%";



document.getElementById(
"demandScore"
)
.innerHTML =
totalDemand;



document.getElementById(
"riskScore"
)
.innerHTML =
totalRisk;




}

catch(error){

console.log(error);

}


}



calculateMarketScore();
