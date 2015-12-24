var video;
var player;
var currentVideo;
var soundState = false;
var videos = [
    103595267, // The Asteroids Galaxy Tour - My Club
    25049692,  // Metronomy - The Bay
    85104634,  // Vance Joy - Riptide
    53434339,  // Tame Impala - Feels Like We Only Go Backwards
    85847275   // The Peach Kings - Be Around
];

var refreshButton = document.getElementById('refresh');
// Chooses another video different than the one currently playing
refreshButton.addEventListener("click", function(){
    var v = [];
    for(var i = 0; i < videos.length; i++){
        if(videos[i] !== currentVideo){
            v.push(videos[i]);
        }
    }

    _selectVideo(v);
});

var muteButton = document.getElementById('mute');
// Mutes the audio on the video
muteButton.addEventListener("click", function(){
    var sound = document.getElementById("mute");

    if(soundState === true){
        //Unmute the Video
        player.api('setVolume', 1);
        sound.children[0].className = "glyphicon glyphicon-volume-up";
        soundState = false;
    }
    else{
        //Mute the Video
        player.api('setVolume', 0);
        sound.children[0].className = "glyphicon glyphicon-volume-off";
        soundState = true;
    }
});

// Selects a video upon page load
(function _selectFirst(ids){
    _selectVideo(ids);
})(videos);

function _selectVideo(ids){
    video = document.getElementById('video-bg');
    player = $f(video);

    var videoId;
    videoId = ids[Math.floor(Math.random() * ids.length)];
    currentVideo = videoId;

    videoURL = "https://player.vimeo.com/video/" + videoId + "?autoplay=1&loop=1&api=1";
    video.src = videoURL;
    if(soundState === true){
        player.api('setVolume', 0);
    }
}

(function(global){
    // Video Height & Width
    var videoHeight = 1080;
    var videoWidth = 1920;

    // If the Video Doesn't Take Up the Full Frame
    // or To Hide Controls
    var innerVideoWidth = 1500;
    var videoLetterBoxWidth = videoWidth - innerVideoWidth;

    // Aspect Ratio
    var videoApspectRatio = videoWidth / videoHeight;
    var innerVideoApspectRatio = innerVideoWidth / videoHeight;

    var documentEl = document.documentElement;

    var video = document.getElementById('video-bg');

    // Resize the Video
    function resizeVideo(){
        var width, height, scale;
        var windowWidth = documentEl.clientWidth;
        var windowHeight = documentEl.clientHeight;
        var windowAspectRatio = windowWidth / windowHeight;

        // Mobile Phone Screen Shaped
        if (windowAspectRatio < innerVideoApspectRatio) {
            scale = windowWidth / innerVideoWidth;
            height = windowHeight;
            width = height * videoApspectRatio;
        }
        // Normal Screen Shaped
        else {
            scale = windowWidth / innerVideoWidth;
            width = windowWidth + (videoLetterBoxWidth * scale);
            height = width / videoApspectRatio;
        }

        video.style.width = width + 'px';
        video.style.height = height + 'px';
    }

    function onWindowResize() {
      resizeVideo();
    }

    global.addEventListener('resize', onWindowResize);

    resizeVideo();
})(window);
