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

function getCanvas() {
    return document.getElementById("canvas");
}

function downloadGameSource() {
    appendJSToDOM("game/ballada-o-dojrzalosci.js", document.body, () => {
        console.log("GAME LOADED");
    });
}

function runGame() {
    const gameCanvasContainer = getGameCanvasContainer();
    if (!getCanvas()) {
        const gameCanvas = document.createElement("canvas");
        gameCanvas.id = "canvas";
        gameCanvasContainer.appendChild(gameCanvas);
    }

    GameMaker_Init();
    showGameContainer();
}

function showGameContainer() {
    const gameContainer = getSectionGameContainer();
    const INVISIBLE_CSS_CLASS = "invisible";
    gameContainer.classList.remove(INVISIBLE_CSS_CLASS);
    const infoContainer = getSectionInfoContainer();
    infoContainer.classList.add(INVISIBLE_CSS_CLASS);
}

function enableFullscreen() {
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
