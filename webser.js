const express = require('express'); // imports express
const app = express(); // Express application instance
let fs = require('fs'); //imports file system module
const path = require('path');


app.use(express.urlencoded({extended: true})); // converts the data to data the server can read
app.use(express.static(__dirname)); // tells the server that the directory deals with static files(html)



app.get("/", (req, res)=>{ //defines the route of the html file
    res.sendFile(__dirname, '/index.html');
});
app.get("/about", (req, res)=>{  //defines the route of the html file
    res.sendFile(__dirname, '/about.html');
});
app.get("/login", (req, res)=>{  //defines the route of the html file
    res.sendFile(__dirname, '/login.html');
});




app.post('/submit', (req, res)=>{
    const {uname, pass} = req.body; //line 25-27 extracts data from the html form
    const userData =`Username: ${uname}, Password: ${pass}`;

    // Send data from your html docs to your text file
    fs.appendFile(path.join(__dirname,'docs','info.txt'),userData, (err) => { 
        if (err) {
            console.error('error detected while saving login data:',err);
            return res.send('Failed');
        }
        return res.send('you will be redirected to the main page in a few seconds');
    });
});


app.listen(8000, ()=> {
    console.log("Server running..."); // defines the port your code is runing on
})