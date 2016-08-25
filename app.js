var express = require("express");
var app = express();
var port = process.env.PORT || 8080;

var multer = require("multer");
var upload = multer({
    dest: 'uploads/'
});

var fs = require('fs');
app.engine('html', require('ejs').renderFile);

app.get('/', function(req, res) {
    res.render(process.cwd() + '/ui/index.html');
});

app.post('/upload', upload.single('file'), function(req, res) {
    console.log('File ' + req.file.filename + ' uploading: success!');
    var metadataObj = {
        "size": req.file.size
    };
    console.log(metadataObj);
    res.send(metadataObj);

    fs.unlink('./uploads/' + req.file.filename, function(error) {
        if (error) console.log('File ' + req.file.filename + ' deleting: error!');
        console.log('File ' + req.file.filename + ' deleting: success!');
    });
});


app.listen(port, function() {
    console.log('Application started on port ' + port);
});
