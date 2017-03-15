var os = require('os');
console.log('CPU: ' + os.cpus().length);
console.log('OS: ' + os.platform() + ' ' + os.arch());
console.log('node version: ' + process.version);