async function getData(){

    const response = await fetch(API_URL);

    const data = await response.json();

    return data;

}



async function addData(data){


    await fetch(API_URL,{

        method:"POST",

        headers:{

            "Content-Type":"application/json"

        },

        body:JSON.stringify({

            data:data

        })

    });


}
