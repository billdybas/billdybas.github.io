function initClock(){
    var seconds = moment().second();
    var minutes = moment().minute();
    var hours = moment().hour() % 12;
    if (hours === 0) {
        hours = 12;
    }

    var hands = [
        {
            hand: 'hours',
            angle: (hours * 30) + (minutes / 2)
        },
        {
            hand: 'minutes',
            angle: (minutes * 6)
        },
        {
            hand: 'seconds',
            angle: (seconds * 6)
        }
    ];

    for (var j = 0; j < hands.length; j++) {
        var elements = document.querySelectorAll('.' + hands[j].hand);
        for (var k = 0; k < elements.length; k++) {
            elements[k].style.webkitTransform = 'rotateZ(' + hands[j].angle + 'deg)';
            elements[k].style.transform = 'rotateZ(' + hands[j].angle + 'deg)';
            if (hands[j].hand === 'minutes') {
                elements[k].parentNode.setAttribute('data-second-angle', hands[j + 1].angle);
            }
        }
    }
}

function setUpMinuteHands(){
    var containers = document.querySelectorAll('.minutes-container');
    var secondAngle = containers[0].getAttribute('data-second-angle');
    if (secondAngle > 0) {
        var delay = (((360 - secondAngle) / 6) + 0.1) * 1000;
        setTimeout(function() {
            moveMinuteHands(containers);
        }, delay);
    }
}

function moveMinuteHands(containers){
    for (var i = 0; i < containers.length; i++) {
        containers[i].style.webkitTransform = 'rotateZ(6deg)';
        containers[i].style.transform = 'rotateZ(6deg)';
    }

    setInterval(function() {
        for (var i = 0; i < containers.length; i++) {
            if (containers[i].angle === undefined) {
                containers[i].angle = 12;
            } else {
                containers[i].angle += 6;
            }
            containers[i].style.webkitTransform = 'rotateZ(' + containers[i].angle + 'deg)';
            containers[i].style.transform = 'rotateZ(' + containers[i].angle + 'deg)';
        }
    }, 60000);
}

function moveSecondHands(){
    var containers = document.querySelectorAll('.seconds-container');
    setInterval(function() {
        for (var i = 0; i < containers.length; i++) {
            if (containers[i].angle === undefined) {
                containers[i].angle = 6;
            } else {
                containers[i].angle += 6;
            }
            containers[i].style.webkitTransform = 'rotateZ(' + containers[i].angle + 'deg)';
            containers[i].style.transform = 'rotateZ(' + containers[i].angle + 'deg)';
        }
    }, 1000);
}

// Chooses a Category based on the day of the week
function chooseCategory(){
    var days_of_week = {
        "0":"Sunday",
        "1":"Monday",
        "2":"Tuesday",
        "3":"Wednesday",
        "4":"Thursday",
        "5":"Friday",
        "6":"Saturday"
    };
    var today = days_of_week["".concat(moment().day())];
    var categories = ["people", "buildings", "objects", "nature", "technology", "food"];
    var keyword = "";

    switch (today) {
        case "Sunday":
            keyword += categories[0];
            break;
        case "Monday":
            keyword += categories[1];
            break;
        case "Tuesday":
            keyword += categories[2];
            break;
        case "Wednesday":
            keyword += categories[3];
            break;
        case "Thursday":
            keyword += categories[4];
            break;
        case "Friday":
            keyword += categories[5];
            break;
        case "Saturday":
            keyword += categories[Math.floor(Math.random() * categories.length)];
            break;
        default:
            console.log("Something Went Wrong!");
            break;
    }
    return keyword;
}

(function(){
    initClock();
    setUpMinuteHands();
    moveSecondHands();
    var image = document.getElementById('image');
    image.src = "https://source.unsplash.com/category/" + chooseCategory();
})();

(function(global){
    // Image Height & Width
    var imageHeight = 1080;
    var imageWidth = 1920;

    // If the Image Doesn't Take Up the Full Frame
    var innerImageWidth = 1920;
    var imageLetterBoxWidth = imageWidth - innerImageWidth;

    // Aspect Ratio
    var imageApspectRatio = imageWidth / imageHeight;
    var innerImageApspectRatio = innerImageWidth / imageHeight;

    var documentEl = document.documentElement;

    var image = document.getElementById("image");

    // Resize the Image
    function resizeImage(){
        var width, height, scale;
        var windowWidth = documentEl.clientWidth;
        var windowHeight = documentEl.clientHeight;
        var windowAspectRatio = windowWidth / windowHeight;

        // Mobile Phone Screen Shaped
        if (windowAspectRatio < innerImageApspectRatio) {
            scale = windowWidth / innerImageWidth;
            height = windowHeight;
            width = height * imageApspectRatio;
        }
        // Normal Screen Shaped
        else {
            scale = windowWidth / innerImageWidth;
            width = windowWidth + (imageLetterBoxWidth * scale);
            height = width / imageApspectRatio;
        }

        image.style.width = width + 'px';
        image.style.height = height + 'px';
    }

    function onWindowResize() {
      resizeImage();
    }

    global.addEventListener("resize", onWindowResize);

    resizeImage();
})(window);
