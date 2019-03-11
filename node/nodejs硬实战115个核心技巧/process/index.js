console.log(process.arch); // 显示系统位数
console.log(process.memoryUsage()); // 显示系统内存信息
switch(process.arch){
    case 'x64':
        console.log('./lib.x64.node');
        break;
    case 'ia32':
        console.log('./lib.Win32.node');
        break;
    default:
        throw new Error('unsupported process.arch:',process.arch);
}

process.stdin.resume();
process.on('SIGHUP',function(){
    console.log('Reloading configuration...');
})
// process.kill(52771,signal='SIGHUP'); 在另一个进程中，执行该语句，可触发process的SIGHUP事件
console.log('PID',process.pid);
