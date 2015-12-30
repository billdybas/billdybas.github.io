var video;
var player;
var currentVideo;
var videos = [
    103595267, // The Asteroids Galaxy Tour - My Club
    25049692,  // Metronomy - The Bay
    85104634,  // Vance Joy - Riptide
    53434339,  // Tame Impala - Feels Like We Only Go Backwards
    85847275   // The Peach Kings - Be Around
];

// Selects a video upon page load
function _selectFirst(ids){
    _selectVideo(ids);
}

function _selectVideo(ids){
    video = document.getElementById('video-bg');
    player = $f(video);

    var videoId;
    videoId = ids[Math.floor(Math.random() * ids.length)];
    currentVideo = videoId;

    videoURL = "https://player.vimeo.com/video/" + videoId + "?autoplay=1&loop=1&api=1";
    video.src = videoURL;
}

$(document).ready(function(){
    _selectFirst(videos);

    // Chooses another video different than the one currently playing
    $('#refresh').click(function(){
        var v = [];
        for(var i = 0; i < videos.length; i++){
            if(videos[i] !== currentVideo){
                v.push(videos[i]);
            }
        }

        _selectVideo(v);

        // Reset the mute button
        document.getElementById('mute').children[0].className = "glyphicon glyphicon-volume-up";

        // Reset the pause button
        document.getElementById('pause').children[0].className = "glyphicon glyphicon-pause";
    });

    // Mutes the audio on the video
    $('#mute').click(function(){
        if(player.api('getVolume' !== 1)){
            //Unmute the Video
            player.api('setVolume', 1);
            document.getElementById('mute').children[0].className = "glyphicon glyphicon-volume-up";
        }
        else if(player.api('getVolume' !== 0)){
            //Mute the Video
            player.api('setVolume', 0);
            document.getElementById('mute').children[0].className = "glyphicon glyphicon-volume-off";
        }
    });

    // Pauses the video
    $('#pause').click(function(){
        if(player.api('paused')){
            //Play the video
            player.api('play');
            document.getElementById('pause').children[0].className = "glyphicon glyphicon-pause";
        }
        else{
            //Pause the video
            player.api('pause');
            document.getElementById('pause').children[0].className = "glyphicon glyphicon-play";
        }
    });
});

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

    var video = document.getElementById("video-bg");

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

    global.addEventListener("resize", onWindowResize);

    resizeVideo();
})(window);
