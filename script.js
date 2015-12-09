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
         smack1: "audio/stickshot1.wav",
         smack2: "audio/stickshot2.wav",
         smack3: "audio/stickshot3.wav",
         tsst1: "audio/timpani_bowl_roots001.wav",
         tsst2: "audio/timpani_bowl_roots002.wav",
         tsst3: "audio/timpani_bowl_roots003.wav"
     });
    
    $('.trigger').mousedown(function(){
        if ($(this).hasClass('boom')){
            sound.boom.play(context.currentTime);
            $('.boom').addClass('hit');
        }
        else if ($(this).hasClass('smack')){
            sound.smack1.play(context.currentTime);
            $('.smack').addClass('hit');
        }
        else if ($(this).hasClass('tsst')){
            sound.tsst1.play(context.currentTime);
            $('.tsst').addClass('hit');
        }
        else {
            console.log('ERROR');
        }
    });
    
    $('.trigger').mouseup(function(){
        $('.trigger').removeClass('hit');
    });
        
        
    $(document).keydown(function(e){
        if (e.which == 66){
            sound.boom.play(context.currentTime);
            $('.boom').addClass('hit');
        }
        else if (e.which == 78){
            sound.smack1.play(context.currentTime);
            $('.smack').addClass('hit');
        }
        else if (e.which == 77) {
            sound.tsst1.play(context.currentTime);
            $('.tsst').addClass('hit');
        }
        else {
            console.log('ERROR');
        }
    });
    
    $(document).keyup(function(){
        $('.trigger').removeClass('hit');b
    });
    
    function randomNum () {
        var num = Math.floor(Math.random() * 2);
        return num;
    }
    
//trying to make a function that picks a round robin sound. might have to do it inside
    //var sound? a method with a for/in loop that picks at random?


    
});



    
    
    
    
    