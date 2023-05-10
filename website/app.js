/* Global Variables */
let baseURL = 'https://api.openweathermap.org/data/2.5/weather?zip='
let apiKey = '&appid=49266a5fe8b0cb23df71915236165822';




// Create a new date instance dynamically with JS
let d = new Date();
let newDate = d.getMonth() + '.' + d.getDate() + '.' + d.getFullYear();
console.log(newDate);
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

function weatherData(e) {
    const zipCode = document.getElementById('zip').value;
    const feel = document.getElementById('feelings').value;
    console.log(zipCode);
    console.log(feel);
    getWeather(baseURL, zipCode, apiKey)
        .then(function (data) {
            postWeather('/data', { temp: data['main']['temp'], date: newDate, content: feel });
            // console.log(feel);
            updateUI();
        });

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
        alert('!', error);
    }
}

const updateUI = async () => {
    const request = await fetch('/all');
    try {
        const allData = await request.json()
        console.log(allData);
        document.getElementById('date').innerHTML = allData.date;
        document.getElementById('temp').innerHTML = allData.temp;
        document.getElementById('content').innerHTML = allData.content;
    } catch (error) {
        console.log('Could not Update the UI');
    }
}


// // Asynchronous POST
// const postData = async (url = '', data = {}) => {
//     const response = await fetch(url, {
//         method: 'POST',
//         credentials: 'same-origin',
//         headers: {
//             'Content-Type': 'application/json',
//         },
//         body: JSON.stringify(data),
//     });
// }