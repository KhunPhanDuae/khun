// =======================================
// Business Intelligence Dashboard
// dashboard.js (Chapter 5)
// =======================================


// Store all data for search/filter
let allBusinessData = [];


// =======================================
// Load Dashboard Data
// =======================================

async function loadDashboard(){

    try{


        const data = await getData();


        // Save data globally
        allBusinessData = data;



        // Category Counter

        let count = {

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



        // Update Dashboard Cards


        if(document.getElementById("marketCount")){

            document.getElementById("marketCount").innerHTML =
            count.Market;

        }



        if(document.getElementById("customerCount")){

            document.getElementById("customerCount").innerHTML =
            count.Customer;

        }



        if(document.getElementById("competitorCount")){

            document.getElementById("competitorCount").innerHTML =
            count.Competitor;

        }



        if(document.getElementById("financeCount")){

            document.getElementById("financeCount").innerHTML =
            count.Finance;

        }



        if(document.getElementById("economyCount")){

            document.getElementById("economyCount").innerHTML =
            count.Economy;

        }



        if(document.getElementById("securityCount")){

            document.getElementById("securityCount").innerHTML =
            count.Security;

        }




        // Draw Chart

        createChart([

            count.Market,

            count.Customer,

            count.Competitor,

            count.Finance,

            count.Economy,

            count.Security

        ]);



        // Show Table

        displayTable(data);



        // KPI Update

        updateKPI(data);



    }


    catch(error){

        console.log(error);

        alert("Dashboard Loading Error");

    }


}




// =======================================
// Display Table
// =======================================

function displayTable(data){



    const table =
    document.querySelector("table");



    if(!table){

        return;

    }



    table.innerHTML = `

    <tr>

    <th>Category</th>

    <th>Title</th>

    <th>Status</th>

    <th>Updated</th>

    </tr>

    `;



    data.forEach(item=>{


        table.innerHTML += `

        <tr>

        <td>${item.Category || ""}</td>

        <td>${item.Title || ""}</td>

        <td>${item.Status || ""}</td>

        <td>${item.Updated || ""}</td>

        </tr>

        `;


    });


}




// =======================================
// Save Business Data
// =======================================

async function saveBusinessData(){



    const data = {


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



    alert("Data Saved Successfully");



    // Clear Form


    document.getElementById("category").value="";


    document.getElementById("title").value="";


    document.getElementById("description").value="";


    document.getElementById("status").value="";



    loadDashboard();


}




// =======================================
// KPI System
// =======================================

function updateKPI(data){



    let total = data.length;


    let active = 0;


    let risk = 0;



    data.forEach(item=>{


        if(item.Status == "Active"){

            active++;

        }



        if(item.Status == "Risk"){

            risk++;

        }


    });



    let score = 0;



    if(total > 0){


        score =
        Math.round(
            (active / total) * 100
        );


    }




    if(document.getElementById("totalData")){

        document.getElementById("totalData").innerHTML =
        total;

    }




    if(document.getElementById("activeData")){

        document.getElementById("activeData").innerHTML =
        active;

    }




    if(document.getElementById("riskData")){

        document.getElementById("riskData").innerHTML =
        risk;

    }




    if(document.getElementById("businessScore")){

        document.getElementById("businessScore").innerHTML =
        score + "%";

    }



}




// =======================================
// Search & Filter System
// =======================================

function filterData(){



    let search =
    document.getElementById("searchInput")
    .value
    .toLowerCase();



    let category =
    document.getElementById("categoryFilter")
    .value;



    let status =
    document.getElementById("statusFilter")
    .value;




    let result =
    allBusinessData.filter(item=>{


        let title =
        (item.Title || "")
        .toLowerCase();



        let matchSearch =
        title.includes(search);



        let matchCategory =
        category=="" ||
        item.Category==category;



        let matchStatus =
        status=="" ||
        item.Status==status;



        return 
        matchSearch &&
        matchCategory &&
        matchStatus;


    });



    displayTable(result);


}




// =======================================
// Auto Refresh
// =======================================

setInterval(loadDashboard,10000);



// Start Dashboard

loadDashboard();
