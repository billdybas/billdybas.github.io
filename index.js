var currentVideo;
var soundState = false;
var playerState = "";

var videos = [
    103595267, // The Asteroids Galaxy Tour - My Club
    25049692,  // Metronomy - The Bay
    85104634,  // Vance Joy - Riptide
    53434339,  // Tame Impala - Feels Like We Only Go Backwards
    85847275   // The Peach Kings - Be Around
];

// Selects a video upon page load
(function selectFirst(ids){
    selectVideo(ids);
})(videos);

function selectVideo(ids){
    var videoId;
    var video = document.getElementById('video-bg');
    videoId = ids[Math.floor(Math.random() * ids.length)];
    currentVideo = videoId;
    videoURL = "http://player.vimeo.com/video/" + videoId + "?autoplay=1&loop=1";
    video.src = videoURL;
}

// Chooses another video different than the one currently playing
function refresh(){
    var v = [];
    for(var i = 0; i < videos.length; i++){
        if(videos[i] !== currentVideo){
            v.push(videos[i]);
        }
    }
    selectVideo(v);
    // Make sure the sound state stays the same
    soundState = !soundState;
    mute();
}

// Mutes the audio on the video
function mute(){
    // Get the iframe internals
    var iframe = document.getElementById('video-bg');
    var innerDoc = iframe.contentDocument || iframe.contentWindow.document;
    var sound = document.getElementById("mute");
    if(playerState !== ""){
        playerState += sound.className;
    }

    if(soundState === true){
        //Unmute the Video
        sound.className = playerState;
        sound.children[0].className = "glyphicon glyphicon-volume-up";
        soundState = false;
    }
    else{
        //Mute the Video
        sound.className += "background-mode";
        sound.children[0].className = "glyphicon glyphicon-volume-off";
        soundState = true;
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
