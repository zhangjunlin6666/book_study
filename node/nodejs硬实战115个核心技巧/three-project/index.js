var args = {
    '-h':displayHelp,
    '-r':readFile
}

function displayHelp(){
    console.log('argument processor:',args);
}

function readFile(file){
    if(file && file.length){
        console.log('reading:',file);
        console.time('read');
        var stream = require('fs').createReadStream(file);
        stream.on('end',function(){
            console.timeEnd('read');
        })

        stream.pipe(process.stdout);
    }else{
        console.error('a file must bo provided with the -r option');
        process.exit(1);
    }
}

// process.argv 存放命令行参数的数组，剩余的元素为其他命令行参数。
if(process.argv.length>0){
    console.log(process.argv);
    process.argv.forEach(function(arg,index){
        if(args.hasOwnProperty(arg)){
            args[arg].apply(this,process.argv.slice(index + 1));
        }
    })
}