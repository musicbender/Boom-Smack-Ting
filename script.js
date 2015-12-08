$(document).ready(function(){

    var context = new AudioContext(),
        getSound = new XMLHttpRequest(),
        snare;

    getSound.open("GET", "snare.mp3", true);
    getSound.responseType = 'arraybuffer';

    getSound.onload = function() {
        context.decodeAudioData(getSound.response, function(buffer) {
        snare = buffer;
        });
    }

    getSound.send();
    
    $('#sub-btn').click(function() {
        var playSound = context.createBufferSource();
        playSound.buffer = snare;
        playSound.connect(context.destination);
        playSound.start(0);
    });
});


//Checking on the server stuff
    /*getSound.onreadystatechange = function () {
        if (getSound.readyState == 4 && getSound.status == 200) {
            $('#scores').html(getSound.responseText);
        }
        else {
            $('#scores').html('<p>Waiting for Server Response...' + getSound.status + getSound.readyState + '</p>');
        }
    }*/
    
    
    
    
    