async function loadDashboard(){


const data = await getData();



let count={

Market:0,

Customer:0,

Competitor:0,

Finance:0,

Economy:0,

Security:0

};



data.forEach(item=>{


if(count[item.Category] !== undefined){

count[item.Category]++;

}


});



// Cards Update


document.getElementById("marketCount").innerHTML=count.Market;

document.getElementById("customerCount").innerHTML=count.Customer;

document.getElementById("competitorCount").innerHTML=count.Competitor;

document.getElementById("financeCount").innerHTML=count.Finance;

document.getElementById("economyCount").innerHTML=count.Economy;

document.getElementById("securityCount").innerHTML=count.Security;



// Chart Update


createChart([

count.Market,

count.Customer,

count.Competitor,

count.Finance,

count.Economy,

count.Security

]);



}




async function saveBusinessData(){



const data={


Category:
document.getElementById("category").value,


Title:
document.getElementById("title").value,


Description:
document.getElementById("description").value,


Status:
document.getElementById("status").value,


Updated:
new Date().toLocaleString()


};



await addData(data);



alert("Saved");



loadDashboard();


}




loadDashboard();


setInterval(loadDashboard,10000);
