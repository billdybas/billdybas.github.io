$(function() {
    // Vimeo Video Ids
    var videos = [
        {
          id: 103595267, // The Asteroids Galaxy Tour - My Club
          start: 0
        },
        {
          id: 42444425,  // The Asteroids Galaxy Tour - Major
          start: 0
        },
        {
          id: 34836200,  // The Asteroids Galaxy Tour - Heart Attack
          start: 0
        },
        {
          id: 25049692,  // Metronomy - The Bay
          start: 0
        },
        {
          id: 85104634,  // Vance Joy - Riptide
          start: 0
        },
        {
          id: 53434339,  // Tame Impala - Feels Like We Only Go Backwards
          start: 0
        },
        {
          id: 147173661, // Tame Impala - The Less I Know The Better
          start: 0
        },
        {
          id: 85847275,  // The Peach Kings - Be Around
          start: 0
        }
    ];

    var player;
    var currentVideo;
    var muted = false;
    var paused = false;

    function _selectVideo(videos) {
        // Pick a random Vimeo Video Id
        var v = videos[Math.floor(Math.random() * videos.length)];
        currentVideo = v;

        // Set the Video
        var video = document.getElementById('video-bg');
        video.src = 'https://player.vimeo.com/video/' + v.id + '?autoplay=1&loop=1&api=1';

        // Set up Vimeo API - Froogaloop
        player = $f(video);
        player.api('seekTo', v.start);
    }

    // Chooses another video different than the one currently playing
    function _refresh() {
        var v = videos.filter(function(video) {
          return video.id !== currentVideo.id;
        });
        _selectVideo(v);

        // Reset the mute button
        $('#mute')[0].children[0].className = 'glyphicon glyphicon-volume-up';
        muted = false;
        // Reset the pause button
        $('#pause')[0].children[0].className = 'glyphicon glyphicon-pause';
        paused = false;
    }

    // Mutes the audio on the video
    function _mute() {
        var mute = $('#mute')[0];
        if(muted === true){
            // Unmute the Video
            player.api('setVolume', 1);
            mute.children[0].className = 'glyphicon glyphicon-volume-up';
            muted = false;
        }
        else {
            // Mute the Video
            player.api('setVolume', 0);
            mute.children[0].className = 'glyphicon glyphicon-volume-off';
            muted = true;
        }
    }

    // Pauses the video
    function _pause() {
        var pause = $('#pause')[0];
        if(paused === true){
            // Play the video
            player.api('play');
            pause.children[0].className = "glyphicon glyphicon-pause";
            paused = false;
        }
        else {
            // Pause the video
            player.api('pause');
            pause.children[0].className = "glyphicon glyphicon-play";
            paused = true;
        }
    }

    _selectVideo(videos);
    $('#refresh').click(_refresh);
    $('#mute').click(_mute);
    $('#pause').click(_pause);
});

(function(global) {
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
    function resizeVideo() {
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
