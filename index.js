const express = require('express');
const file_upload = require('express-fileupload')
const app = express();

app.use(file_upload());

app.use(express.static('static'));

app.post('/upload', function(req, res) {
    
  if (!req.files)
    return res.status(400).send('No files were uploaded.');

  // The name of the input field (i.e. "sampleFile") is used to retrieve the uploaded file
  var sampleFile = req.files.sampleFile;

  // Use the mv() method to place the file somewhere on your server
  sampleFile.mv('public/'+ sampleFile.name);
  res.send(sampleFile.name);
});

app.listen(8000);