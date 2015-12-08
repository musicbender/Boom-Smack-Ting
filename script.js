$(document).ready(function(){

    var context = new AudioContext();

    function audioFileLoader(fileDirectory) {
        var soundObj = {};
        soundObj.fileDirectory = fileDirectory;
        var playSound = undefined;
        var getSound = new XMLHttpRequest();
        getSound.open("GET", soundObj.fileDirectory, true);
        getSound.responseType = "arraybuffer";
        getSound.onload = function() {
            context.decodeAudioData(getSound.response, function(buffer) {
                soundObj.soundToPlay = buffer;
            });
        }

        getSound.send();


        soundObj.play = function() {
            playSound = context.createBufferSource();
            playSound.buffer = soundObj.soundToPlay;
            playSound.connect(context.destination)
            playSound.start(context.currentTime)
        }

        soundObj.stop = function() {

            playSound.stop(context.currentTime)
        }

        return soundObj;

    };


    function audioBatchLoader(obj) {

        for (prop in obj) {
            obj[prop] = audioFileLoader(obj[prop])

        }
        return obj

    }

  
     var sound = audioBatchLoader({
         boom: "audio/slammingcardoor.mp3",
         smack: "audio/stickshot1.wav",
         tsst: "audio/timpani_bowl_roots001.wav"
     });
    
    $('.trigger').click(function(){
        if ($(this).hasClass('boom')){
            sound.boom.play(context.currentTime);
        }
        else if ($(this).hasClass('smack')){
            sound.smack.play(context.currentTime);
        }
        else if ($(this).hasClass('tsst')){
            sound.tsst.play(context.currentTime);
        }
        else {
            console.log('ERROR');
        }
    });
    
    $(document).keydown(function(e){
        if (e.which == 66){
            sound.boom.play(context.currentTime);
        }
        else if (e.which == 78){
            sound.smack.play(context.currentTime);
        }
        else if (e.which == 77) {
            sound.tsst.play(context.currentTime);
        }
        else {
            console.log('ERROR');
        }
    });
    
});



    
    
    
    
    