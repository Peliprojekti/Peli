/*jslint browser: true*/
/*global Audio: true*/

var peliAudio = {
    maxSame: 10,
    soundFolder: '/data/sounds/',
    supported: null,
    enabled: true,
    sounds: {},
    loadSound: function (sound, doMany) {
        "use strict";
        if (this.enabled) {
            console.info("peliAudio::loadSound ", sound, doMany);
            var filename = this.soundFolder + sound + this.supportedAudioType(),
                count = (doMany === true ? this.maxSame : 1),
                soundObj = {
                    index: 0,
                    audio: []
                };

            while (count > 0) {
                soundObj.audio.push(new Audio(filename));
                count -= 1;
            }

            this.sounds[sound] = soundObj;
        }
    },
    play: function (sound) {
        "use strict";
        if (this.enabled) {
            if (!this.sounds[sound]) {
                this.loadSound(sound);
            }
            var soundObj = this.sounds[sound];

            soundObj.audio[soundObj.index].play();
            soundObj.index = (soundObj.index + 1) % soundObj.audio.length;
        }
    },
    filename: function (sound) {
        "use strict";
        var type = this.checkAudioSupport();

        return this.soundFolder + sound + type;
    },
    supportedAudioType: function () {
        "use strict";
        if (this.supported !== null) {
            return this.supported;
        }

        var a = document.createElement('audio');

        if (a.canPlayType) {
            if (a.canPlayType('audio/ogg; codecs="vorbis"')) {
                //sendServerMessage('Audio support for ogg detected');
                this.supported = '.ogg';
            }
            /*
             else if (a.canPlayType('audio/mpeg;')) {
             this.supported = 'mp3';
             }
             */
            else {
                //sendServerMessage('Audio support for wav detected');
                this.enabled = false;
            }
        }

        return this.supported;
    }
};