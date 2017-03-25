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
        { id: 89711963, start: '' },
        // Saint Motel - Move
        { id: 190972242, start: '' },
        // JR JR - Gone
        { id: 136337308, start: '' },
        // Miami Horror feat. Kimbra - I Look to You
        { id: 14375063, start: '' },
        // Sylvan Esso - Radio
        { id: 180576620, start: '' }
    ];

    var player;
    var history = [];
    var state = {
      muted: false,
      playing: true
    };

    function _setState(prop, value) {
        state[prop] = value;
    }

    // Removes and Adds CSS Classes to an Element
    function _toggleClass($element, remove, add) {
        $element.removeClass(remove).addClass(add);
    }

    function _selectVideo(videos) {
        // Pick a random Vimeo Video Id
        var v = videos[Math.floor(Math.random() * videos.length)];
        history.push(v.id);

        // Set the Video
        var video = document.getElementById('video-bg');
        video.src = 'https://player.vimeo.com/video/' + v.id + '?autoplay=1&loop=1&api=1' + (v.start ? '#t=' + v.start : '');

        // Set up Vimeo API - Froogaloop
        player = $f(video);
    }

    // Chooses another video that hasn't been played
    function _refresh() {
        if (history.length === videos.length) {
            history = [];
        }
        var v = videos.filter(function(video) {
            return $.inArray(video.id, history) === -1;
        });
        _selectVideo(v);

        // Reset the mute button
        _mute(true);
        // Reset the pause button
        _pause(false);
    }

    // Mutes the audio on the video
    function _mute(isMuted) {
        var $elem = $('#mute');
        if (isMuted) {
            // Unmute the Video
            player.api('setVolume', 1);
            _toggleClass($elem.find('span'), 'glyphicon-volume-off', 'glyphicon-volume-up');
            $elem.attr('title', 'Mute');
            $elem.attr('aria-label', 'Mute');
            _setState('muted', false);
        } else {
            // Mute the Video
            player.api('setVolume', 0);
            _toggleClass($elem.find('span'), 'glyphicon-volume-up', 'glyphicon-volume-off');
            $elem.attr('title', 'Unmute');
            $elem.attr('aria-label', 'Unmute');
            _setState('muted', true);
        }
    }

    // Pauses the video
    function _pause(isPlaying) {
        var $elem = $('#pause');
        if (isPlaying) {
            // Pause the video
            player.api('pause');
            _toggleClass($elem.find('span'), 'glyphicon-pause', 'glyphicon-play');
            $elem.attr('title', 'Play');
            $elem.attr('aria-label', 'Play');
            _setState('playing', false);
        } else {
            // Play the video
            player.api('play');
            _toggleClass($elem.find('span'), 'glyphicon-play', 'glyphicon-pause');
            $elem.attr('title', 'Pause');
            $elem.attr('aria-label', 'Pause');
            _setState('playing', true);
        }
    }

    _selectVideo(videos);
    $('#refresh').click(_refresh);
    $('#mute').click(function() {
        _mute(state.muted);
    });
    $('#pause').click(function() {
        _pause(state.playing);
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
