近日整理以前的 node 项目时发现一个文件同时声明了 spawn 和 exec 两种方法。最后只是用了 spawn 方法，所以查了一下这两者的区别。
Nodejs 基于事件驱动来处理并发，本身是单线程模式运行的。Nodejs 通过使用 child_process 模块来生成多个子进程来处理其他事物。主要包括 4 个异步进程函数 (spawn,exec,execFile,fork) 和 3 个同步进程函数 (spawnSync,execFileSync,execSync)。以异步函数中 spawn 是最基本的创建子进程的函数，其他三个异步函数都是对 spawn 不同程度的封装。spawn 只能运行指定的程序，参数需要在列表中给出，而 exec 可以直接运行复杂的命令。
比如要运行 du -sh /disk1 命令， 使用 spawn 函数需要写成 spawn(‘du‘, [‘-sh ‘, ‘/disk1’])，而使用 exec 函数时，可以直接写成 exec(‘du -sh /disk1’)。exec 是会先进行 Shell 语法解析，因此用 exec 函数可以更方便的使用复杂的 Shell 命令，包括管道、重定向等。
 
一，var exec =require('child_process').exec;
exec 在子进程输出结果将放入 buffer 中，在结果返回完全之后，再将输出一次性地以回调函数参数的形式返回。如果 exec 的 buffer 体积设置的不够大，它将会以一个 “maxBuffer exceeded” 错误失败告终。另外，exec 函数是对 spawn 的一种友好封装，增加 Shell 命令解析，可以直接嵌入复杂的命令
a)        语法：child_process.exec(command[, options], callback)
b)        实例：
// 使用 wget 下载文件的函数
vardownload_file_wget = function(file_url) {
 
  // 提取文件名
  var file_name =url.parse(file_url).pathname.split('/').pop();
  // 组合 wget 命令
  var wget = 'wget -P' + DOWNLOAD_DIR + ' ' +file_url;
  // 使用 exec 执行 wget 命令
 
  var child = exec(wget, function(err, stdout,stderr) {
    if (err) throw err;
    else console.log(file_name + 'downloadedto' + DOWNLOAD_DIR);
  });
};
// 执行 cat 统计文件
varchildProcess = require('child_process');
 
var ls =childProcess.exec('cat *.js | wc', function (error, stdout, stderr) {
   if (error) {
     console.log(error.stack);
     console.log('Error code:'+error.code);
   }
   console.log('Child Process STDOUT:'+stdout);
});
二，var spawn =require('child_process').spawn;
spawn 在子线程开始执行后，就开始不断将数据从子进程返回给主进程。从语法中我们可以发现与 exec 的一个区别是 spawn 是不支持 callback 函数的，它通过流的方式发数据传给主进程，从而实现了多进程之间的数据交换。这个功能的直接用应用场景就是 “系统监控”。在 Linux 下，我们有很多命令行工具，可以实时监控 CPU, 内存, IO, 网络等数据，那么用 Node 的 child_process 模块可以很容易地把这些数据采集的我们自己的应用中。
a)        语法：child_process.spawn(command[, args][, options])
b)        实例：
// 这个实例就是所做的项目中 nodejs 实现堡垒机中生成子线程远程登录的方法
Var worker = spawn('telnet', ['202.198.0.123']);
            client.telnet = worker.stdin;
            worker.on('close', function (code){
                client.fileWriteStream.end();
                //client.status = 2;
                client.socket.write('\n\r');
               client.socket.write('[Common]');
               client.socket.write('[INFO] :Connection to Device has closed!\n\r');
                closeSocket(client.socket,client);
                                      client.socket.destroy();
            });
            worker.stdout.on('data', function(data) {
                data = data.toString();
                if(client.status == 3){
                    return;
                }
                if((data.indexOf('nmslogin')>=0)&&(client.isLogin==0)){
                    client.secret = 1;
                    client.telnet.write('username\n');
                }elseif((data.indexOf('Password')>=0)&&(client.isLogin==0)){
                    client.telnet.write('password\n');
                    client.isLogin = 1;
                }elseif(data.indexOf('Password')>=0&& client.status == 4){
                     client.notChange= 1;
                     client.fileWriteStream.write(data);
                    client.socket.write(data);
                    client.datas =client.datas+data.toString();
                            }else {
                    client.fileWriteStream.write(data);
                    client.socket.write(data);
                    client.datas =client.datas+data.toString();
                }
            });
            worker.on('error',function(error){
                client.fileWriteStream.end();
                client.status = 2;
               client.socket.write('[ERR2]  :Anerror occured!')
               client.socket.write('[INFO] :Connection to Device has closed!\n\r');
               //client.socket.write('>>>>Input Device IP:');
                closeSocket(client.socket,client);
            });
 

扩展阅读:
JavaScript 运行机制详解：再谈 Event Loop
http://www.ruanyifeng.com/blog/2014/10/event-loop.html
Node.js 软肋之回调大坑
http://www.infoq.com/cn/articles/nodejs-callback-hell
Node.js 的线程和进程
http://www.admin10000.com/document/4196.html
 
http://rickgaribay.net/archive/2012/01/28/node-is-not-single-threaded.aspx
 
Linux 下同步模式、异步模式、阻塞调用、非阻塞调用总结
http://www.360doc.com/content/13/0117/12/5073814_260691714.shtml