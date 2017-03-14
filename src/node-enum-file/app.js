var fs = require('fs');
var path = 'E:/rover-self-work/nodejs';


function readDirectory(dirPath) {
    if (fs.existsSync(dirPath)) {
        var files = fs.readdirSync(dirPath);

        files.forEach(function(file) {
            var filePath = dirPath + "/" + file;
            var stats = fs.statSync(filePath);

            if (stats.isDirectory()) {
                console.log('\n读取目录：\n', filePath, "\n");
                readDirectory(filePath);
            } else if (stats.isFile()) {

                console.log(filePath);
            }
        });

    } else {
        console.log('Not Found Path : ', dirPath);
    }
}

readDirectory(path);