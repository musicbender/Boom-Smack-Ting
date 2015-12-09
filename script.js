$(document).ready(function(){

    var context = new (window.AudioContext || window.webkitAudioContext)();

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

    //loop through list of audio files
    function audioBatchLoader(obj) {
        for (prop in obj) {
            obj[prop] = audioFileLoader(obj[prop])
        }
        return obj
    }

    //batch audio loader
     var sound = audioBatchLoader({
         boom: "audio/slammingcardoor.mp3",
         smack1: "audio/stickshot1.wav",
         smack2: "audio/stickshot2.wav",
         smack3: "audio/stickshot3.wav",
         tsst1: "audio/timpani_bowl_roots001.wav",
         tsst2: "audio/timpani_bowl_roots002.wav",
         tsst3: "audio/timpani_bowl_roots003.wav"
     });
    
    //Random number between 1 and 3 for Round Robin
    function randomNum () {
        var num = Math.floor(Math.random() * 3);
        return num;
    }

    //Play sound with Round Robin
    function roundRobinPlay (sound1, sound2, sound3, trigger) {
        var sounds = [sound1, sound2, sound3];
        var rr = randomNum();
        if ((sound2 !== null) && (sound3 !== null)){
            sounds[rr].play(context.currentTime);
            trigger.addClass('hit');
        }
        else {
            sound1.play(context.currentTime);
            trigger.addClass('hit');
            console.log('DEBUG: else');
        }
    }
    
    
    /*-----Trigger sounds-----*/
    
    //Trigger with mouse click.
    $('.trigger').mousedown(function(){
        if ($(this).hasClass('boom')){
            roundRobinPlay(sound.boom, null, null, $('.boom'));
        }
        else if ($(this).hasClass('smack')){
            roundRobinPlay(sound.smack1, sound.smack2, sound.smack3, $('.smack'));
        }
        else if ($(this).hasClass('tsst')){
            roundRobinPlay(sound.tsst1, sound.tsst2, sound.tsst3, $('.tsst'));
        }
        else {
            console.log('ERROR');
        }
    });
    
    $('.trigger').mouseup(function(){
        $('.trigger').removeClass('hit');
    });
        
    //Trigger with keydown b, n, and m. 
    $(document).keydown(function(e){
        if (e.which == 66){
            roundRobinPlay(sound.boom, null, null, $('.boom'));
        }
        else if (e.which == 78){
            roundRobinPlay(sound.smack1, sound.smack2, sound.smack3, $('.smack'));
        }
        else if (e.which == 77) {
            roundRobinPlay(sound.tsst1, sound.tsst2, sound.tsst3, $('.tsst'));
        }
        else {
            console.log('ERROR');
        }
    });
    
    $(document).keyup(function(){
        $('.trigger').removeClass('hit');
    });
});



    
    
    
    
    