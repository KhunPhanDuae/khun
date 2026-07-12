// ===============================
// Business Intelligence Dashboard
// app.js
// ===============================

// သင့် SheetDB API
const API_URL = "https://sheetdb.io/api/v1/6zk630pgtw0p4";


// ===============================
// Load Data From Google Sheets
// ===============================
async function loadData() {

    try {

        const response = await fetch(API_URL);

        if (!response.ok) {
            throw new Error("Cannot connect to SheetDB");
        }

        const data = await response.json();

        const table = document.querySelector("table");

        table.innerHTML = `
        <tr>
            <th>Category</th>
            <th>Title</th>
            <th>Status</th>
            <th>Updated</th>
        </tr>
        `;

        data.forEach(item => {

            table.innerHTML += `
            <tr>
                <td>${item.Category || ""}</td>
                <td>${item.Title || ""}</td>
                <td>${item.Status || ""}</td>
                <td>${item.Updated || ""}</td>
            </tr>
            `;

        });

    } catch (error) {

        console.error(error);

        alert("❌ Unable to load data.");

    }

}



// ===============================
// Save Data To Google Sheets
// ===============================
async function saveData() {

    const category = document.getElementById("category").value.trim();
    const title = document.getElementById("title").value.trim();
    const description = document.getElementById("description").value.trim();
    const status = document.getElementById("status").value.trim();

    if (
        category === "" ||
        title === "" ||
        description === "" ||
        status === ""
    ) {

        alert("Please fill all fields.");

        return;

    }

    try {

        const response = await fetch(API_URL, {

            method: "POST",

            headers: {
                "Content-Type": "application/json"
            },

            body: JSON.stringify({

                data: {

                    Category: category,

                    Title: title,

                    Description: description,

                    Status: status,

                    Updated: new Date().toLocaleString()

                }

            })

        });

        if (!response.ok) {

            throw new Error("Save Failed");

        }

        alert("✅ Saved Successfully");

        // Clear Inputs
        document.getElementById("category").value = "";
        document.getElementById("title").value = "";
        document.getElementById("description").value = "";
        document.getElementById("status").value = "";

        // Reload Table
        loadData();

    } catch (error) {

        console.error(error);

        alert("❌ Save Failed");

    }

}



// ===============================
// Auto Refresh Every 10 Seconds
// ===============================
setInterval(loadData, 10000);


// ===============================
// First Load
// ===============================
loadData();
