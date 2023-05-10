/* Global Variables */
let baseURL = 'https://api.openweathermap.org/data/2.5/weather?zip='
let apiKey = '&appid=49266a5fe8b0cb23df71915236165822';





// Create a new date instance dynamically with JS
let d = new Date();
let newDate = d.getMonth() + 1 + '.' + d.getDate() + '.' + d.getFullYear();

// Asynchronous GET request to get API data
//can change 'getWeather' to 'getData'
const getWeather = async (baseURL, zip, apiKey) => {
    const res = await fetch(baseURL + zip + apiKey)
    try {
        const data = await res.json();
        console.log(data);
        return data;

    } catch (error) {
        alert("Zip code does not exists!");
    }

}

document.getElementById('generate').addEventListener('click', weatherData);
// Added sanitizer to prevent XSS(Cross-Site-Scripting) Attacks 
// which can cause hikacking the User credentionls 
// As an example you can enter this payload to 2nd field: <a href="javascript:alert(1)"></a>
const sanitizer = new Sanitizer()

function weatherData(e) {
    const zipCode = document.getElementById('zip').value;
    const feel = document.getElementById('feelings').value;

    if (zipCode === "" & feel === "") { //Error handling, user can't Generate without entering the Zip and Feeling
        alert('Enter Zip Code and Feeling');
    }
    else {
        getWeather(baseURL, zipCode, apiKey)
            //Chain Promise
            .then(function (data) {
                postWeather('/data', { temp: data['main']['temp'], date: newDate, content: feel });

                //Dynamicly Updates the UI using innerHTML
                updateUI();
            });
    }

}


// Async POST request to add API data with chaining(.then)
// can change 'postWeather' to 'postData'
const postWeather = async (url = '', data = {}) => {
    const response = await fetch(url, {
        method: 'POST',
        credentials: 'same-origin',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
    });
    try {
        const newData = await response.json();
        console.log("Post response newData:", newData);
        return newData;
    } catch (error) {
        alert('Internal Server Error 500', error);
    }
}

const updateUI = async () => {
    const request = await fetch('/all');
    try {
        const allData = await request.json()

        // COnverting the Temperature from Kelvin to Celsius
        tempCelsius = (allData.temp - 273.15).toFixed(1);

        //Updating using innerHTML
        document.getElementById('date').innerHTML = "Date: " + allData.date;
        document.getElementById('temp').innerHTML = "Temperature: " + tempCelsius + "℃";
        document.getElementById('content').innerHTML = allData.content;
        document.getElementById('content').setHTML("Feelings: " + allData.content, sanitizer); //Sanitizer to prevent cross-site-scripting

    } catch (error) {
        console.log('Could not Update the UI');
    }
}
