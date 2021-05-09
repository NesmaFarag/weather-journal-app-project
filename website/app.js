/* Global Variables */
const apiKey = "3ceca5fe506e5228891f911ff3b92688";
const zipCode = document.querySelector("#zip");
const Feeling = document.querySelector("#feelings");
const Btn = document.querySelector("#generate");


// Create a new date instance dynamically with JS
let d = new Date();
let newDate = d.getMonth()+1+'.'+ d.getDate()+'.'+ d.getFullYear();

// when clicking generate button

Btn.addEventListener('click', function checking(){
    if (!zipCode.value){
        alert("Please,Enter ZIP code!");
    }
    getData().then (data => PostData("/addData", {
        temp: data.main.temp,
        data: newDate,
        feelings: Feeling.value,
    }).then(()=> updateUI())
    )
});

//to get data from api with zip code
const getData = async()=>{
    const apiURL=`https://api.openweathermap.org/data/2.5/weather?zip=${zipCode.value}&appid=${apiKey}&units=metric`
    const request = await fetch(apiURL);
    try {
        const data = await request.json()
        return data;
    }
    catch(error) {
        console.log("ERROR",error);
    }
}

// to post data on the local server
const PostData = async(url="" , data={}) => {
      await fetch (url, {
        method: 'POST',
        credentials: 'same-origin',
        headers: {
            'content-type':'application/json',
        },
        body: JSON.stringify(data),  
     })
     try{
        return true; 
    }

    catch(error) {
        console.log("ERROR",error)

    }

}
 
//the outcome 
const updateUI = async() => {
   const request = await fetch ('/all')
    try {
        const allData = await request.json();
        document.getElementById("date").innerHTML = "Date: "+allData.date;
        document.getElementById("temp").innerHTML = "temp: "+allData.temp;
        document.getElementById("content").innerHTML = "your feeling: "+allData.userResponse;
    }
    catch(error){
        console.log("ERROR",error)
    }
}
