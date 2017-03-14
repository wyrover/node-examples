"use strict";

var fs = require("fs");

var args = process.argv.splice(2);

var fileDirectory = args[0] || "xxx";

if (fs.existsSync(fileDirectory)) {
    var files = fs.readdirSync(fileDirectory);
    files.forEach(function(file) {
        var filePath = fileDirectory + "/" + file;
        if (/\.jpg$/.test(file)) {
            var fileName = file.replace(/(\-)(\d+)(\_s\.jpg)/, function() {
                return arguments[1] + ((arguments[2] | 0) + 1714) + arguments[3];
            });
            var newFilePath = fileDirectory + "/" + fileName;
            fs.rename(filePath, newFilePath, function(err) {
                if (err) throw err;
                console.log(fileName + " ok~");
            });
        }
    });
} else {
    console.log(fileDirectory + "  Not Found!");
}