// ==================================
// Business Intelligence Dashboard
// app.js (Chapter 3)
// ==================================


// SheetDB API

const API_URL = "https://sheetdb.io/api/v1/6zk630pgtw0p4";


// Chart Variable

let businessChart;


// ==================================
// Load Data From Google Sheets
// ==================================

async function loadData(){

    try{


        const response = await fetch(API_URL);


        const data = await response.json();



        // ==========================
        // Count Business Categories
        // ==========================


        let market = 0;
        let customer = 0;
        let competitor = 0;
        let finance = 0;
        let economy = 0;
        let security = 0;



        data.forEach(item=>{


            switch(item.Category){


                case "Market":
                    market++;
                    break;


                case "Customer":
                    customer++;
                    break;


                case "Competitor":
                    competitor++;
                    break;


                case "Finance":
                    finance++;
                    break;


                case "Economy":
                    economy++;
                    break;


                case "Security":
                    security++;
                    break;


            }


        });



        // ==========================
        // Update KPI Cards
        // ==========================


        document.getElementById("marketCount").innerHTML = market;


        document.getElementById("customerCount").innerHTML = customer;


        document.getElementById("competitorCount").innerHTML = competitor;


        document.getElementById("financeCount").innerHTML = finance;


        document.getElementById("economyCount").innerHTML = economy;


        document.getElementById("securityCount").innerHTML = security;




        // ==========================
        // Draw Chart
        // ==========================


        drawChart(
            market,
            customer,
            competitor,
            finance,
            economy,
            security
        );




        // ==========================
        // Display Table
        // ==========================


        const table = document.querySelector("table");



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


    catch(error){


        console.log(error);


        alert("Data Load Error");


    }



}



// ==================================
// Chart.js Bar Chart
// ==================================


function drawChart(
    market,
    customer,
    competitor,
    finance,
    economy,
    security
){


    const ctx = document.getElementById("businessChart");



    if(!ctx){

        return;

    }



    if(businessChart){

        businessChart.destroy();

    }




    businessChart = new Chart(ctx,{


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


                label:"Business Intelligence Data",


                data:[

                    market,

                    customer,

                    competitor,

                    finance,

                    economy,

                    security

                ]

            }]


        }



    });



}



// ==================================
// Save Data To Google Sheets
// ==================================


async function saveData(){



    const category =
    document.getElementById("category").value;



    const title =
    document.getElementById("title").value;



    const description =
    document.getElementById("description").value;



    const status =
    document.getElementById("status").value;




    await fetch(API_URL,{


        method:"POST",


        headers:{


            "Content-Type":"application/json"


        },


        body:JSON.stringify({


            data:{


                Category:category,


                Title:title,


                Description:description,


                Status:status,


                Updated:new Date().toLocaleString()


            }


        })



    });




    alert("Saved Successfully");



    // Clear Form


    document.getElementById("category").value="";


    document.getElementById("title").value="";


    document.getElementById("description").value="";


    document.getElementById("status").value="";



    loadData();



}




// ==================================
// Auto Refresh
// ==================================


setInterval(loadData,10000);



// First Load

loadData();
