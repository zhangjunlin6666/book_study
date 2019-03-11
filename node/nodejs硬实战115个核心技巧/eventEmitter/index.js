var util = require('util');
var events = require('events');

var AudioDevice = {
    play:function(track){
        console.log(track);
    },
    stop:function(){
        console.log('stop');
    }
}
function MusicPlayer(){
    this.playing = false;
    events.EventEmitter.call(this);
}

util.inherits(MusicPlayer,events.EventEmitter);

var musicPlayer = new MusicPlayer();

musicPlayer.on('play',function(track){
    this.playing = true;
    AudioDevice.play(track);
})

musicPlayer.on('error',function(err){
    console.log('Error:',err);
})

musicPlayer.on('stop',function(){
    this.playing = false;
    AudioDevice.stop();
})

musicPlayer.emit('play','The Roots - The Fire');

setTimeout(function(){
    musicPlayer.emit('stop');
    musicPlayer.emit('error','Little Comets - Jennifer');
},1000)