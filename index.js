(function selectVideo(){
    var videoId;
    var ids = [
        103595267, // The Asteroids Galaxy Tour - My Club
        25049692,  // Metronomy - The Bay
        85104634,  // Vance Joy - Riptide
        53434339,  // Tame Impala - Feels Like We Only Go Backwards
        85847275   // The Peach Kings - Be Around
    ];
    var video = document.getElementById('video-bg');
    videoId = ids[Math.floor(Math.random() * ids.length)];
    videoURL = "https://player.vimeo.com/video/" + videoId + "?autoplay=1&loop=1";
    video.src = videoURL;
})();

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
