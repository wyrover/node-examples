����������ǰ�� node ��Ŀʱ����һ���ļ�ͬʱ������ spawn �� exec ���ַ��������ֻ������ spawn ���������Բ���һ�������ߵ�����
Nodejs �����¼��������������������ǵ��߳�ģʽ���еġ�Nodejs ͨ��ʹ�� child_process ģ�������ɶ���ӽ������������������Ҫ���� 4 ���첽���̺��� (spawn,exec,execFile,fork) �� 3 ��ͬ�����̺��� (spawnSync,execFileSync,execSync)�����첽������ spawn ��������Ĵ����ӽ��̵ĺ��������������첽�������Ƕ� spawn ��ͬ�̶ȵķ�װ��spawn ֻ������ָ���ĳ��򣬲�����Ҫ���б��и������� exec ����ֱ�����и��ӵ����
����Ҫ���� du -sh /disk1 ��� ʹ�� spawn ������Ҫд�� spawn(��du��, [��-sh ��, ��/disk1��])����ʹ�� exec ����ʱ������ֱ��д�� exec(��du -sh /disk1��)��exec �ǻ��Ƚ��� Shell �﷨����������� exec �������Ը������ʹ�ø��ӵ� Shell ��������ܵ����ض���ȡ�
 
һ��var exec =require('child_process').exec;
exec ���ӽ��������������� buffer �У��ڽ��������ȫ֮���ٽ����һ���Ե��Իص�������������ʽ���ء���� exec �� buffer ������õĲ�������������һ�� ��maxBuffer exceeded�� ����ʧ�ܸ��ա����⣬exec �����Ƕ� spawn ��һ���Ѻ÷�װ������ Shell �������������ֱ��Ƕ�븴�ӵ�����
a)        �﷨��child_process.exec(command[, options], callback)
b)        ʵ����
// ʹ�� wget �����ļ��ĺ���
vardownload_file_wget = function(file_url) {
 
  // ��ȡ�ļ���
  var file_name =url.parse(file_url).pathname.split('/').pop();
  // ��� wget ����
  var wget = 'wget -P' + DOWNLOAD_DIR + ' ' +file_url;
  // ʹ�� exec ִ�� wget ����
 
  var child = exec(wget, function(err, stdout,stderr) {
    if (err) throw err;
    else console.log(file_name + 'downloadedto' + DOWNLOAD_DIR);
  });
};
// ִ�� cat ͳ���ļ�
varchildProcess = require('child_process');
 
var ls =childProcess.exec('cat *.js | wc', function (error, stdout, stderr) {
   if (error) {
     console.log(error.stack);
     console.log('Error code:'+error.code);
   }
   console.log('Child Process STDOUT:'+stdout);
});
����var spawn =require('child_process').spawn;
spawn �����߳̿�ʼִ�к󣬾Ϳ�ʼ���Ͻ����ݴ��ӽ��̷��ظ������̡����﷨�����ǿ��Է����� exec ��һ�������� spawn �ǲ�֧�� callback �����ģ���ͨ�����ķ�ʽ�����ݴ��������̣��Ӷ�ʵ���˶����֮������ݽ�����������ܵ�ֱ����Ӧ�ó������� ��ϵͳ��ء����� Linux �£������кܶ������й��ߣ�����ʵʱ��� CPU, �ڴ�, IO, ��������ݣ���ô�� Node �� child_process ģ����Ժ����׵ذ���Щ���ݲɼ��������Լ���Ӧ���С�
a)        �﷨��child_process.spawn(command[, args][, options])
b)        ʵ����
// ���ʵ��������������Ŀ�� nodejs ʵ�ֱ��ݻ����������߳�Զ�̵�¼�ķ���
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
 

��չ�Ķ�:
JavaScript ���л�����⣺��̸ Event Loop
http://www.ruanyifeng.com/blog/2014/10/event-loop.html
Node.js ����֮�ص����
http://www.infoq.com/cn/articles/nodejs-callback-hell
Node.js ���̺߳ͽ���
http://www.admin10000.com/document/4196.html
 
http://rickgaribay.net/archive/2012/01/28/node-is-not-single-threaded.aspx
 
Linux ��ͬ��ģʽ���첽ģʽ���������á������������ܽ�
http://www.360doc.com/content/13/0117/12/5073814_260691714.shtml