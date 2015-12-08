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
         snare: "audio/snare.mp3",
         sound1: "audio/sound1.mp3",
         sound2: "audio/sound2.mp3",
         sound3: "audio/sound3.mp3"
     });
    
    $(document).click(function(){
        sound.sound1.play(context.currentTime);
    });
});



    
    
    
    
    