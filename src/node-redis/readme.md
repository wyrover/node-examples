redis 做工作队列的逻辑

client 端工作任务数据 lpush 到列表里，并 publish 相关的channel 订阅信息

server 端 subscribe 相关的 channel，接受发送过来的信息(是列表里的 key)放自己的缓冲区中，然后 rpop(key) 获取数据循环处理


