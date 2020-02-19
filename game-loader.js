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

function getCanvasContainter() {
    return document.getElementById("gm4html5_div_id");
}

function getInfoContainer() {
    return document.getElementById("info-container");
}

function runGame() {
    const gameCanvasContainer = getCanvasContainter();
    const gameCanvas = document.createElement("canvas");
    gameCanvas.id = "canvas";
    gameCanvas.width = 960;
    gameCanvas.height = 540;
    gameCanvasContainer.appendChild(gameCanvas);

    global.GameMaker_Init();
    // enableFullscreen();
console.log("ASD");
    const INVISIBLE_CSS_CLASS = "invisible";
    gameCanvasContainer.classList.remove(INVISIBLE_CSS_CLASS);
    const infoContainer = getInfoContainer();
    infoContainer.classList.add(INVISIBLE_CSS_CLASS);
}