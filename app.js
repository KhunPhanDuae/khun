const API_URL = "https://sheetdb.io/api/v1/6zk630pgtw0p4";

async function loadData(){

const response = await fetch(API_URL);

const data = await response.json();

const table = document.querySelector("table");

table.innerHTML=`

<tr>

<th>Category</th>

<th>Title</th>

<th>Status</th>

<th>Updated</th>

</tr>

`;

data.forEach(item=>{

table.innerHTML+=`

<tr>

<td>${item.Category}</td>

<td>${item.Title}</td>

<td>${item.Status}</td>

<td>${item.Updated}</td>

</tr>

`;

});

}

loadData();
async function saveData(){

const category=document.getElementById("category").value;

const title=document.getElementById("title").value;

const description=document.getElementById("description").value;

const status=document.getElementById("status").value;

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

Updated:new Date().toLocaleDateString()

}

})

});

alert("Saved Successfully");

loadData();

}
