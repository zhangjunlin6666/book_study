process.stdin.resume();
process.stdin.setEncoding('utf8');

process.stdin.on('data',function(text){
    process.stdout.write(text.toUpperCase());
    process.stdout.write('很晚了你该睡觉了');
})