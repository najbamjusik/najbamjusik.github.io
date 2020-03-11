const canvas = document.getElementById('matrix-canvas');
const ctx = canvas.getContext('2d');
const canvasWidth = canvas.width = document.body.offsetWidth;
const canvasHeight = canvas.height = document.body.offsetHeight;
const columns = Math.floor(canvasWidth / 20) + 1;
ctx.fillStyle = '#000';
ctx.fillRect(0, 0, canvasWidth, canvasHeight);

var time = 1;

function getLyricsRow() {
    switch (time) {
        case 1:
            return "chwdp";
        case 2:
            return "jebać policje tylko bug moze nas sondzić";
        case 3:
            return " ";
    }
}

async function drawText(lyricsRow, msDuration) {
    const startTime = Date.now();
    const ypositions = Array(columns).fill(0);
    lyricsRow = " " + lyricsRow + " ";

    function step() {
        ctx.fillStyle = '#0001';
        ctx.fillRect(0, 0, canvasWidth, canvasHeight);
        ctx.fillStyle = '#0f0';
        ctx.font = '15pt monospace';

        const lyricsChars = lyricsRow.split('');
        const ySlots = ypositions.length;
        const yLeftOffset = Math.floor((ySlots - lyricsChars.length) / 2);
        let lyricsCharIdx = 0;
        ypositions.forEach((y, idx) => {
            let text = '';
            if (idx > yLeftOffset && idx < yLeftOffset + lyricsChars.length + 1) {
                text = lyricsChars[lyricsCharIdx];
                lyricsCharIdx++;
            } else {
                text = String.fromCharCode(Math.random() * 128);
            }

            const x = idx * 20;
            ctx.fillText(text, x, y);
            if (y > 100 + Math.random() * 10000) {
                ypositions[idx] = 0;
            } else {
                ypositions[idx] = y + 20
            }
            ;
        });
    }

    while (startTime + msDuration > Date.now()) {
        step();
        await sleep(50);
    }
}

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

async function run() {
    while(1){
        await drawText("dominik krulig bugz", 2 * 1000);
        await drawText("ballada o pościgu za hajsem", 2 * 1000);
        await drawText("najba mjusik", 2 * 1000);
        await drawText("coming soon", 2 * 1000);
    }
}

run();