

function submergeSubmarine() {
    // Scroll to the top of the page first
    window.scrollTo(0, 0);

    const submarineContainer = document.getElementById("submarine-container");
    submarineContainer.style.top = "10%";  // Adjust to where you want the submarine to submerge

    // Allow scrolling
    document.body.style.overflowY = "scroll";
    document.documentElement.style.overflowY = "scroll";  // This sets the overflow for the <html> element

    // Handle scroll events
    document.addEventListener('scroll', onScroll);
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
    fadeComic("comic1", "photo1", 5, 60);  // Example values in percentages for comic1, adjust as needed
    fadeComic("comic2", "photo2", 30, 90);  // Example values in percentages for comic2, adjust as needed
    fadeComic("comic3", "photo3", 50, 100);  // Example values in percentages for comic3, adjust as needed
}

function spawnFish() {
    const fishTypes = [
        "localAssets/fish1Left.png",
        "localAssets/fish1Right.png",
        "localAssets/fish2Left.png",
        "localAssets/fish2Right.png",
        "localAssets/fish3Left.png",
        "localAssets/fish4Left.png",
        "localAssets/fish5Left.png",
        "localAssets/fish5Right.png",
        // ... add paths to all your fish images
    ];

    const randomFish = fishTypes[Math.floor(Math.random() * fishTypes.length)];

    const fish = document.createElement("img");
    fish.src = randomFish;
    fish.style.position = "absolute";

    // Setting random starting positions for the fish
    fish.style.bottom = `${Math.random() * 50}vh`; // Random vertical position ranging from 0vh to 50vh
    fish.style.left = `${Math.random() * 100}vw`; // Random horizontal position

    document.getElementById("fish-container").appendChild(fish);

    let pos = parseInt(window.getComputedStyle(fish).bottom);
    let interval = setInterval(() => {
        pos++;
        fish.style.bottom = `${pos}px`;
        if (pos > window.innerHeight) {
            clearInterval(interval);
            fish.remove();
        }
    }, 20);  // Speed of fish going upwards, adjust the value as needed
}
