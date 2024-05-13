let platformxValue = 999999;
let tile4xValue = 999999;
let tile3xValue = 999999;
let tile2xValue = 999999;
let tile1xValue = 999999;
let lowerMountainsxValue = 999999;
let mountainsxValue = 999999;
let oceanSparklexValue = 999999;
let skyxValue = 999999;
let mouseX;
let sonicX;
let mouseSonicDifferenceWithoutPercentage;
let moveAnimation;
const sonicElement = document.querySelector(".sonic");
const sky = document.querySelector(".sky");
const oceanSparkle = document.querySelector(".ocean-sparkle");
const mountains = document.querySelector(".mountains");
const lowerMountains = document.querySelector(".lower-mountains");
const tile1 = document.querySelector(".tile-1");
const tile2 = document.querySelector(".tile-2");
const tile3 = document.querySelector(".tile-3");
const tile4 = document.querySelector(".tile-4");
const platformWrapperElement = document.querySelector(".platform-wrapper");
let mainElement = document.querySelector("main");
let footerElement = document.querySelector("footer");

const continuousMove = () => {
    if (!mouseSonicDifferenceWithoutPercentage) return;
    if (Math.abs(mouseSonicDifferenceWithoutPercentage * 100) < 10) return;
    platformxValue += 20 * +mouseSonicDifferenceWithoutPercentage;
    tile4xValue += 4.0 * +mouseSonicDifferenceWithoutPercentage;
    tile3xValue += 3.5 * +mouseSonicDifferenceWithoutPercentage;
    tile2xValue += 2.5 * +mouseSonicDifferenceWithoutPercentage;
    tile1xValue += 2.0 * +mouseSonicDifferenceWithoutPercentage;
    lowerMountainsxValue += 1.5 * +mouseSonicDifferenceWithoutPercentage;
    mountainsxValue += 1.25 * +mouseSonicDifferenceWithoutPercentage;
    oceanSparklexValue += 0.5 * +mouseSonicDifferenceWithoutPercentage;
    skyxValue += 0.5 * +mouseSonicDifferenceWithoutPercentage;
    sky.style.transform = `translate3d(${skyxValue * -1}px, 0, 0)`;
    oceanSparkle.style.transform = `translate3d(${
        oceanSparklexValue * -1
    }px, 0, 0)`;
    mountains.style.transform = `translate3d(${mountainsxValue * -1}px, 0, 0)`;
    lowerMountains.style.transform = `translate3d(${
        lowerMountainsxValue * -1
    }px, 0, 0)`;
    tile1.style.transform = `translate3d(${tile1xValue * -1}px, 0, 0)`;
    tile2.style.transform = `translate3d(${tile2xValue * -1}px, 0, 0)`;
    tile3.style.transform = `translate3d(${tile3xValue * -1}px, 0, 0)`;
    tile4.style.transform = `translate3d(${tile4xValue * -1}px, 0, 0)`;
    platformWrapperElement.style.transform = `translate3d(${
        platformxValue * -1
    }px, 0, 0)`;
};

const animationLoop = () => {
    continuousMove();
    moveAnimation = requestAnimationFrame(animationLoop);
};

moveAnimation = requestAnimationFrame(animationLoop);

const resetSonic = () => {
    sonicElement.style.backgroundImage = "url(./assets/stand.gif)";
    sonicElement.style.transform = "scaleX(1)";
    mouseSonicDifferenceWithoutPercentage = 0;
};

const handleMouseMove = (event, elem) => {
    if (
        elem === "footer" &&
        !event.target.classList.contains("footer-element")
    ) {
        resetSonic();
        return;
    }
    mouseX = event.clientX;
    let sonicPosition = sonicElement.getBoundingClientRect();
    sonicX = sonicPosition.left + sonicPosition.width / 2;
    mouseSonicDifferenceWithoutPercentage = (mouseX - sonicX) / sonicX;
    let mouseSonicDifferenceInPercentage = ((mouseX - sonicX) / sonicX) * 100;

    if (
        mouseSonicDifferenceInPercentage > 10 &&
        mouseSonicDifferenceInPercentage < 75
    ) {
        sonicElement.style.backgroundImage = "url(./assets/run.gif)";
        sonicElement.style.transform = "scaleX(1)";
    } else if (
        mouseSonicDifferenceInPercentage < -10 &&
        mouseSonicDifferenceInPercentage > -75
    ) {
        sonicElement.style.backgroundImage = "url(./assets/run.gif)";
        sonicElement.style.transform = "scaleX(-1)";
    } else if (mouseSonicDifferenceInPercentage > 75) {
        sonicElement.style.backgroundImage = "url(./assets/circle.gif)";
        sonicElement.style.transform = "scaleX(1)";
    } else if (mouseSonicDifferenceInPercentage < -75) {
        sonicElement.style.backgroundImage = "url(./assets/circle.gif)";
        sonicElement.style.transform = "scaleX(-1)";
    } else {
        sonicElement.style.backgroundImage = "url(./assets/stand.gif)";
        sonicElement.style.transform = "scaleX(1)";
    }
};

mainElement.addEventListener("mousemove", (e) => handleMouseMove(e, "main"));
footerElement.addEventListener("mousemove", (e) =>
    handleMouseMove(e, "footer"),
);

mainElement.addEventListener("mouseleave", resetSonic);

const jump = (event, elem) => {
    if (
        elem === "footer" &&
        !event.target.classList.contains("footer-element")
    ) {
        return;
    }
    const sonicWrapperElement = document.querySelector(".sonic-wrapper");
    if (
        !sonicWrapperElement.classList.contains("going-up") &&
        !sonicWrapperElement.classList.contains("going-down")
    ) {
        console.log("Jump");
        sonicWrapperElement.classList.add("going-up");
        setTimeout(() => {
            sonicWrapperElement.classList.remove("going-up");
            sonicWrapperElement.classList.add("going-down");
            setTimeout(() => {
                sonicWrapperElement.classList.remove("going-down");
            }, 490);
        }, 500);
    }
};

document.addEventListener("keypress", (e) => {
    if (e.key === " ") {
        jump();
    }
});

mainElement.addEventListener("click", (e) => jump(e, "main"));
footerElement.addEventListener("click", (e) => jump(e, "footer"));
let soundHandleImg = document.querySelector("#soundHandleImg");
let audio = document.querySelector("#audio");

soundHandleImg.addEventListener("click", () => {
    if (audio.paused) {
        audio.play();
        soundHandleImg.src = "./assets/mute.svg"; // Change the image to represent mute
    } else {
        audio.pause();
        soundHandleImg.src = "./assets/unmute.svg"; // Change the image to represent play
    }
});
