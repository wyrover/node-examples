var fs = require('fs');
var path = require('path');
var fs_queue = [];

var _path = 'H:\\rover';
_path = path.resolve(_path);

function sleep(milliSeconds) {
  var startTime = new Date().getTime();
  while (new Date().getTime() < startTime + milliSeconds);
};

fs.readdir(_path, function(err, files) {
  if (err) {
    console.log(err);
  }

  // console.log(files);
  if (files && files.length) {
    files.forEach(function(filename) {
      fs_queue.push(_path + '/' + filename);
      console.log(filename);
    });
  }
});

while (1) {
  //  if (fs_queue.length == 0) {
  //    sleep(1000);
  //    continue;
  //  }

  var current_path = fs_queue.pop();

  var stat = fs.statSync(current_path);

  if (stat.isDirectory()) {
    fs.readdir(current_path).forEach(function(file_name) {
      fs_queue.push(current_path + '/' + file_name);
    });
  } else if (stat.isFile()) {
    console.log(file_name);
  }

}