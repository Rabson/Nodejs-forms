const http = require('http');

// To pasre URLs
const url = require('url');

// for accesing files.
const fs = require('fs');

// from parser
const formidable = require('formidable');

const path = require('path')

// Creating new http server.
http.createServer(function (req, res) {

    const q = url.parse(req.url, true);
    if (req.url == '/fileupload') {
       
        const form = new formidable.IncomingForm();
        form.parse(req, function (err, fields, files) {
            const ext = path.extname(files.filetoupload.name)
            const oldpath = files.filetoupload.path;
            const hash = oldpath.split('/')[2];
            // const newpath = './uploads/' + files.filetoupload.name;
            const newpath = './uploads/' + hash + ext;
            fs.rename(oldpath, newpath, function (err) {
                if (err) throw err;
                res.writeHead(200, { 'Content-Type': 'text/html' });
                res.write('File uploaded and moved!');
                return res.end();
            });
        });
        
    } else  {
        
        // const filename = "./views/" + q.pathname;
        const filename = "./views/form.html";
        fs.readFile(filename, function (err, data) {
            if (err) {
                res.writeHead(404, { 'Content-Type': 'text/html' });
                return res.end("404 Not Found");
            }
            res.writeHead(200, { 'Content-Type': 'text/html' });
            res.write(data);
            return res.end();
        });
    }
}).listen(8080, () => {

    // Server runnning status Callback.
    console.log(`server is running`)
});