var INVISIBLE_CSS_CLASS = "invisible";
var LOADING_CSS_CLASS = "pending";

function appendJSToDOM(url, location, onLoadCallback) {
    const scriptTag = document.createElement("script");
    scriptTag.src = url;
    location.appendChild(scriptTag);
    scriptTag.onload = onLoadCallback;
}

function getSectionGameContainer() {
    return document.getElementById("section-game-container");
}

function getGameCanvasContainer() {
    return document.getElementById("game-canvas-container");
}

function getSectionInfoContainer() {
    return document.getElementById("section-info-container");
}

function getPlayButton() {
    return document.getElementById("play-button");
}

function getCanvas() {
    return document.getElementById("canvas");
}

function downloadSources() {
    appendJSToDOM("game/spaace-rap.js", document.body, () => {
        console.log("GAME LOADED");
        getPlayButton().classList.remove(LOADING_CSS_CLASS);
        getPlayButton().disabled = false;
        runGame();
        appendJSToDOM("//www.instagram.com/embed.js", document.body, () => {
        })
    });
}

function runGame() {
    const gameCanvasContainer = getGameCanvasContainer();
    if (!getCanvas()) {
        const gameCanvas = document.createElement("canvas");
        gameCanvas.id = "canvas";
        gameCanvas.width = gameCanvasContainer.clientWidth;
        gameCanvas.height = gameCanvasContainer.clientHeight;
        gameCanvasContainer.appendChild(gameCanvas);
    }

    emitUserClickedPlayButtonAutomatically();
    GameMaker_Init();
    showGameContainer();
}

function showGameContainer() {
    const gameContainer = getSectionGameContainer();
    gameContainer.classList.remove(INVISIBLE_CSS_CLASS);
    const infoContainer = getSectionInfoContainer();
    infoContainer.classList.add(INVISIBLE_CSS_CLASS);
}

function enableFullscreen() {
    window.scrollTo(0, 0);
    emitUserClickedFullscreen();
    const gameCanvas = getCanvas();
    if (gameCanvas.requestFullscreen) {
        gameCanvas.requestFullscreen();
    } else if (gameCanvas.mozRequestFullScreen) {
        /* Firefox */
        gameCanvas.mozRequestFullScreen();
    } else if (gameCanvas.webkitRequestFullscreen) {
        /* Chrome, Safari and Opera */
        gameCanvas.webkitRequestFullscreen();
    } else if (gameCanvas.msRequestFullscreen) {
        /* IE/Edge */
        gameCanvas.msRequestFullscreen();
    }
}

function fullscreen() {
    const gameCanvas = getCanvas();
    if (gameCanvas.requestFullscreen) {
        gameCanvas.requestFullscreen();
    } else if (gameCanvas.mozRequestFullScreen) {
        /* Firefox */
        gameCanvas.mozRequestFullScreen();
    } else if (gameCanvas.webkitRequestFullscreen) {
        /* Chrome, Safari and Opera */
        gameCanvas.webkitRequestFullscreen();
    } else if (gameCanvas.msRequestFullscreen) {
        /* IE/Edge */
        gameCanvas.msRequestFullscreen();
    }
}

if (document.addEventListener) {
    document.addEventListener('fullscreenchange', onFullscreenExitHandler, false);
    document.addEventListener('mozfullscreenchange', onFullscreenExitHandler, false);
    document.addEventListener('MSFullscreenChange', onFullscreenExitHandler, false);
    document.addEventListener('webkitfullscreenchange', onFullscreenExitHandler, false);
}

function onFullscreenExitHandler() {
    if (
        document.webkitIsFullScreen === false ||
        document.mozFullScreen === false ||
        document.msFullscreenElement === false
    ) {
        emitUserExitFullscreen()
    }
}
