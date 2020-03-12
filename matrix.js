const canvas = document.getElementById('matrix-canvas');
const ctx = canvas.getContext('2d');
const canvasWidth = canvas.width = document.body.offsetWidth;
const canvasHeight = canvas.height = document.body.offsetHeight;
const columns = Math.floor(canvasWidth / 20) + 1;
ctx.fillStyle = '#000';
ctx.fillRect(0, 0, canvasWidth, canvasHeight);

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

const hihatInterval = 1.5;

const timeline = [
    {text: "jo", timestamp: 2},
    {text: "dominik krulig bugz", timestamp: 3},
    {text: "najba mjusik", timestamp: 5},
    {text: "??? ??? ???", timestamp: 8},
    {text: "rzuciłem studia", timestamp: 12},
    {text: "w chuj hajs", timestamp: 18},
    {text: "do jutra", timestamp: 23},
    {text: "do jutra", timestamp: 24},
    {text: "z ziomami", timestamp: 26.2},
    {text: "za rzadko spotykamy", timestamp: 28.6},
    {text: "ziomy tęsknią", timestamp: 32.4},
    {text: "swoją karierę", timestamp: 34.6},
    {text: "w obce miasto", timestamp: 37.5},
    {text: "nie widzimy się za czesto", timestamp: 40.4},
    {text: "na pewno", timestamp: 47},
    {text: "na pewno", timestamp: 47.8},
    {text: "na ruchy przestzeń", timestamp: 53},
    {text: "więcej", timestamp: 59},
    {text: "więcej", timestamp: 60},
    {text: "żałuję przed snem", timestamp: 64},
    {text: "strach", timestamp: 72.8},
    {text: "strachstrachstrachstrachstrachstrach", timestamp: 72.8 + 1 * hihatInterval},
    {text: "     strach     ", timestamp: 72.8 + 2 * hihatInterval},
    {text: "      strach          strach         strach     ", timestamp: 72.8 + 3 * hihatInterval},
    {text: "overthinking", timestamp: 84.8},
    {text: "over?overthinking?thinking", timestamp: 84.8 + 1 * hihatInterval},
    {text: "~~~~~~overthinking~~~~~~", timestamp: 84.8 + 2 * hihatInterval},
    {text: "~overthinking~~~~~~overthinking~~~~~~overthinking~", timestamp: 84.8 + 3 * hihatInterval},
    // {text: "jebać depresje", timestamp: 22},
    // {text: "strach", timestamp: 22},

    {text: "", timestamp: 100}, // end item required
];
let currentDrawingTaskId = 0;

async function run(drawingTaskId, startingTimestamp) {
    const dataHeh = [
        {text: " ", timestamp: startingTimestamp},
        ...timeline.filter((entry) => entry.timestamp >= startingTimestamp)
    ];
    const audio = document.getElementById("audio-element");

    while (1) {
        audio.currentTime = startingTimestamp;
        const startTime = Date.now();
        for (const [idx, currentEntry] of dataHeh.entries()) {
            const isLast = idx === dataHeh.length - 1;
            if (isLast) {
                continue;
            }
            const nextEntry = dataHeh[idx + 1];
            const durationSec = nextEntry.timestamp - currentEntry.timestamp;
            const duratonMs = Math.floor(durationSec * 1000);
            console.log(`Time ${startingTimestamp + (Date.now() - startTime) / 1000} s, text:\n ${currentEntry.text}`);
            await drawText(drawingTaskId, currentEntry.text, duratonMs);
            if (currentDrawingTaskId > drawingTaskId) {
                break;
            }
        }
        if (currentDrawingTaskId > drawingTaskId) {
            break;
        }
    }
}

async function drawText(drawingTaskId, dataToPrint, msDuration) {
    const startTime = Date.now();
    const ypositions = Array(columns).fill(0);

    function step() {
        ctx.fillStyle = '#0001';
        ctx.fillRect(0, 0, canvasWidth, canvasHeight);
        ctx.fillStyle = '#0f0';
        ctx.font = '15pt monospace';

        if (!dataToPrint) {
            return;
        }
        const outputText = " " + dataToPrint + " ";

        const lyricsChars = outputText.split('');
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
        });
    }

    while (startTime + msDuration > Date.now()) {
        step();
        if (currentDrawingTaskId > drawingTaskId) {
            break;
        }
        await sleep(50);
    }
}

function musicPlaying() {
    const startingTimestamp = 0;
    const startTime = Date.now();
    // setInterval(() => {
    //     console.info(`Time ${startingTimestamp + (Date.now() - startTime) / 1000} s`);
    // }, 1000);
    currentDrawingTaskId++;
    run(currentDrawingTaskId, startingTimestamp);
}

function musicStopped() {
    currentDrawingTaskId++;
}

let initialRunTriggered = false;
function musicLoaded() {
    if (!initialRunTriggered && !isMobile()) {
        document.getElementById("player-button").click();
        initialRunTriggered = true;
    }
}