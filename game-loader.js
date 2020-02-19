function enableFullscreen() {
    const gameCanvas = document.getElementById("canvas");
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

function appendJSToDOM(url, location, onLoadCallback) {
    const scriptTag = document.createElement("script");
    scriptTag.src = url;
    location.appendChild(scriptTag);
    scriptTag.onload = onLoadCallback;
}

function getGameContainer() {
    return document.getElementById("game-container");
}

function getCanvasContainter() {
    return document.getElementById("gm4html5_div_id");
}

function getInfoContainer() {
    return document.getElementById("info-container");
}

function spawnGameCanvas() {
    appendJSToDOM("game/ballada-o-dojrzalosci.js", document.body, () => {
        console.log("GAME LOADED");
    });
}

function runGame() {
    const gameCanvasContainer = getCanvasContainter();
    const gameCanvas = document.createElement("canvas");
    gameCanvas.id = "canvas";
    gameCanvas.width = 960;
    gameCanvas.height = 540;
    gameCanvasContainer.appendChild(gameCanvas);

    GameMaker_Init();
    showGameContainer();
}

function showGameContainer() {
    const gameContainer = getGameContainer();
    const INVISIBLE_CSS_CLASS = "invisible";
    gameContainer.classList.remove(INVISIBLE_CSS_CLASS);
    const infoContainer = getInfoContainer();
    infoContainer.classList.add(INVISIBLE_CSS_CLASS);
}