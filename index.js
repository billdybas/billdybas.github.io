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
          start: 80
        },
        {
          id: 85847275,  // The Peach Kings - Be Around
          start: 0
        }
    ];

    var player;
    var currentVideo;
    var muted = false;
    var playing = true;

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

    // Removes and Adds CSS Classes to an Element
    function _toggleClass(element, desc, remove, add) {
      $(element).find(desc).first().removeClass(remove).addClass(add);
    }

    // Chooses another video different than the one currently playing
    function _refresh() {
        var v = videos.filter(function(video) {
          return video.id !== currentVideo.id;
        });
        _selectVideo(v);

        // Reset the mute button
        _mute(true);
        // Reset the pause button
        _pause(false);
    }

    // Mutes the audio on the video
    function _mute(isMuted) {
        if (isMuted) {
            // Unmute the Video
            player.api('setVolume', 1);
            _toggleClass('#mute', 'span', 'glyphicon-volume-off', 'glyphicon-volume-up');
        } else {
            // Mute the Video
            player.api('setVolume', 0);
            _toggleClass('#mute', 'span', 'glyphicon-volume-up', 'glyphicon-volume-off');
        }
        muted = !muted;
    }

    // Pauses the video
    function _pause(isPlaying) {
        if (isPlaying) {
            // Pause the video
            player.api('pause');
            _toggleClass('#pause', 'span', 'glyphicon-pause', 'glyphicon-play');
        } else {
            // Play the video
            player.api('play');
            _toggleClass('#pause', 'span', 'glyphicon-play', 'glyphicon-pause');
        }
        playing = !playing;
    }

    _selectVideo(videos);
    $('#refresh').click(_refresh);
    $('#mute').click(function() {
        _mute(muted);
    });
    $('#pause').click(function() {
        _pause(playing);
    });
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
