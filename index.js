const express = require('express');
const axios = require('axios');
const file_upload = require('express-fileupload')

const app = express();

app.use(express.static('static'));
app.use(express.static('public'));
app.use(file_upload());

app.post('/upload', function(req, res){
    "use strict";
    if(!req.files)
        return res.status(400).send('No files were uploaded.');
    
    // The name of the input field (i.e. "sampleFile") is used to retrieve the uploaded file 
    let sampleFile = req.files.sampleFile;
 
    // Use the mv() method to place the file somewhere on your server 
    sampleFile.mv('/somewhere/on/your/server/filename.jpg', function(err) {
        if (err)
            return res.status(500).send(err);
 
    res.send('File uploaded!');
  });
});

app.listen(3000);