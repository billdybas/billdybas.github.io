$(function() {
    // Vimeo Video Ids
    var videos = [
        // The Asteroids Galaxy Tour - My Club
        { id: 103595267, start: '' },
        // The Asteroids Galaxy Tour - Major
        { id: 42444425, start: '' },
        // The Asteroids Galaxy Tour - Heart Attack
        { id: 34836200, start: '' },
        // Metronomy - The Bay
        { id: 25049692, start: '2s' },
        // Vance Joy - Riptide
        { id: 85104634, start: '' },
        // Tame Impala - Feels Like We Only Go Backwards
        { id: 53434339, start: '' },
        // Tame Impala - The Less I Know The Better
        { id: 147173661, start: '1m20s' },
        // The Peach Kings - Be Around
        { id: 85847275, start: '' },
        // Yelle - Que veux-tu
        { id: 20535037, start: '4m20s' },
        // Yelle - Complètement Fou!
        { id: 106872929, start: '' },
        // DJ Fresh x High Contrast feat. Dizzee Rascal - How Love Begins
        { id: 149666793, start: '' },
        // Kishi Bashi - Philosophize in It! Chemicalize with It!
        { id: 89711963, start: '' }
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
        video.src = 'https://player.vimeo.com/video/' + v.id + '?autoplay=1&loop=1&api=1#t=' + v.start;

        // Set up Vimeo API - Froogaloop
        player = $f(video);
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
            muted = false;
        } else {
            // Mute the Video
            player.api('setVolume', 0);
            _toggleClass('#mute', 'span', 'glyphicon-volume-up', 'glyphicon-volume-off');
            muted = true;
        }
    }

    // Pauses the video
    function _pause(isPlaying) {
        if (isPlaying) {
            // Pause the video
            player.api('pause');
            _toggleClass('#pause', 'span', 'glyphicon-pause', 'glyphicon-play');
            playing = false;
        } else {
            // Play the video
            player.api('play');
            _toggleClass('#pause', 'span', 'glyphicon-play', 'glyphicon-pause');
            playing = true;
        }
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
