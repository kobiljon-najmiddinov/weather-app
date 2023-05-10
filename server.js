//Empty object for end route
projectData = {};

//Initilization of express
const express = require('express');
const app = express();

//Dependencies(express dependecy because body-parser depricated)
//Middleware (insted of body-parser we use express)
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

//Cors for cross origin allowance
const cors = require('cors');
app.use(cors());

// Initialize the main project folder
app.use(express.static('website'));

//Port
const port = 3000;

//Server
const server = app.listen(port, listening); //port, callback function(listening). parameters of Listen function
//Callback function
function listening() {
    console.log(`Server is running on port: ${port}`);
}

//GET route to post projectData object
app.get('/all', retriveData);

function retriveData(req, res) {
    console.log("Get route respond:", projectData)
    res.send(projectData);
}
app.post('/data', addEntry);

function addEntry(req, res) {
    newEntry = {
        temp: req.body.temp,
        date: req.body.date,
        content: req.body.content,
    }

    projectData = newEntry; //Storing Entry data to projectData
    res.send(projectData);
    console.log("Post pushed to data: ", projectData);
}

