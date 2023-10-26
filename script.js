

function submergeSubmarine() {
    // Scroll to the top of the page first
    window.scrollTo(0, 0);

    const submarineContainer = document.getElementById("submarine-container");
    submarineContainer.style.top = "10%";  // % is how much the sub submerges

    // Allow scrolling
    document.body.style.overflowY = "scroll";
    document.documentElement.style.overflowY = "scroll";  // sets the overflow for the <html> element

    // Handle scroll events
    document.addEventListener('scroll', onScroll);

    // Fade out the title image
    const titleImage = document.getElementById("titleImage");
    titleImage.style.opacity = "0";
    // Fade out the button
    const button = document.querySelector('button');
    button.style.transition = "opacity 1s";   // 1 second fade-out transition
    button.style.opacity = '0';

    setTimeout(() => {
        titleImage.style.display = "none";
        button.remove();
    }, 1000); // this is in ms
}

function getPixelFromPercentage(percentage) {
    return (document.documentElement.scrollHeight - window.innerHeight) * percentage / 100;
}

function fadeComic(comicId, photoId, fadeInStartPercent, fadeOutEndPercent) {
    let scrolled = document.documentElement.scrollTop;

    const fadeInStart = getPixelFromPercentage(fadeInStartPercent);
    const fadeOutEnd = getPixelFromPercentage(fadeOutEndPercent);

    const comic = document.getElementById(comicId);
    const photo = document.getElementById(photoId);

    if (scrolled > fadeInStart && scrolled < fadeOutEnd) {
        comic.style.opacity = '1';
        photo.style.opacity = '1';
    } else {
        comic.style.opacity = '0';
        photo.style.opacity = '0';
    }
}

function onScroll() {
    let scrolled = document.documentElement.scrollTop;

    // Move the submarine with the scroll
    const submarineContainer = document.getElementById("submarine-container");
    const offset = window.innerHeight * 0.5; // Offset to adjust where the submarine appears on the screen.
    submarineContainer.style.top = `${scrolled + offset}px`;

    // Handle spawning fish
    if (scrolled % 100 === 0) {
        spawnFish();
    }

    // Fade in/out comics based on submarine position
    fadeComic("comic1", "photo1", 5, 35);  // parameters are fade in fade out positions
    fadeComic("comic2", "photo2", 30, 55);
    fadeComic("comic3", "photo3", 50, 75);
}

function spawnFish() { //handles spawning of fish sprites
    const fishTypesLeft = [
        "localAssets/fish1Right.png",
        "localAssets/fish2Right.png",
        "localAssets/fish5Right.png",
    ];
    const fishTypesRight = [
        "localAssets/fish1Left.png",
        "localAssets/fish2Left.png",
        "localAssets/fish3Left.png",
        "localAssets/fish4Left.png",
        "localAssets/fish5Left.png",
    ];

    // Determines direction (left-to-right or right-to-left)
    const isLeftSpawn = Math.random() < 0.5;
    const randomFish = isLeftSpawn ? fishTypesLeft[Math.floor(Math.random() * fishTypesLeft.length)]
                                   : fishTypesRight[Math.floor(Math.random() * fishTypesRight.length)];

    const fish = document.createElement("img");
    fish.src = randomFish;
    fish.style.position = "absolute";
    fish.style.zIndex = "0";  // Place fish behind the ocean but above the background

    let randomVerticalPosition = Math.random() * window.innerHeight;  // Random position in the viewport
    fish.style.top = `${window.scrollY + randomVerticalPosition}px`; // Factoring in the scroll position
    fish.style.left = isLeftSpawn ? '-10%' : '110%'; // Start outside of view for smooth entrance

    document.getElementById("fish-container").appendChild(fish);

    const moveAmount = 2;  // Determines speed, adjust as needed
    let pos = parseInt(isLeftSpawn ? fish.style.left : window.innerWidth - parseInt(fish.style.left));

    let interval = setInterval(() => {
        if (isLeftSpawn) {
            pos += moveAmount;
            fish.style.left = `${pos}px`;
        } else {
            pos -= moveAmount;
            fish.style.left = `${pos}px`;
        }

        if ((isLeftSpawn && pos > window.innerWidth) || (!isLeftSpawn && pos + fish.offsetWidth < 0)) {
            clearInterval(interval);
            fish.remove();
        }
    }, 20);  // fish speed
}
