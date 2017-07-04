const express = require('express');
const axios = require('axios');
const file_upload = require('express-fileupload');
var request = require('request');
var fs = require('fs');

const app = express();


app.use(express.static('static'));
app.use(file_upload());

app.post('/upload', function (req, res) {
    if (!req.files) {
        return res.status.send(400, 'No files were uploaded.');
    }

    // Save file to uploads directory
    var file = req.files.uploadFile;
    var new_path = 'static/uploads/' + file.name;
    file.mv(new_path, function () {
        // POST file to Python server
        console.log(new_path);
        var image = fs.readFileSync(new_path);
        request.post({
            url: 'http://localhost:5000/predict_b64',
            body: image
        }, function (r1, r2) {
            response_value = JSON.stringify(r2.body)
            res.send(response_value);
        });
    });
});

app.listen(3000);