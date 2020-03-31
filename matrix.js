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
    {text: "( ͡°( ͡° ͜ʖ( ͡° ͜ʖ ͡°)ʖ ͡°) ͡°)", timestamp: 6},
    {text: "??? ??? ???", timestamp: 8},
    {text: "rzuciłem studia", timestamp: 12},
    {text: "w chuj hajs", timestamp: 18},
    {text: "do jutra", timestamp: 23},
    {text: "do jutra", timestamp: 23.8},
    {text: "z ziomami", timestamp: 25.6},
    {text: "za rzadko spotykamy", timestamp: 29.0},
    {text: "ziomy tęsknią", timestamp: 32.4},
    {text: "swoją karierę", timestamp: 35.4},
    {text: "w obce miasto", timestamp: 37.5},
    {text: "nie widzimy się za czesto", timestamp: 40.5},
    {text: "na pewno", timestamp: 47},
    {text: "na pewno", timestamp: 47.8},
    {text: "na ruchy przestzeń", timestamp: 52.8},
    {text: "więcej", timestamp: 58.8},
    {text: "więcej", timestamp: 59.7},
    {text: "żałuję przed snem", timestamp: 64},
    {text: "strach", timestamp: 72.4},
    {text: "strachstrachstrachstrachstrachstrach", timestamp: 72.4 + 1 * hihatInterval},
    {text: "     strach     ", timestamp: 72.4 + 2 * hihatInterval},
    {text: "      strach          strach         strach     ", timestamp: 72.4 + 3 * hihatInterval},
    {text: "overthinking", timestamp: 85.3},
    {text: "over?overthinking?thinking", timestamp: 85.3 + 1 * hihatInterval},
    {text: "~~~~~~overthinking~~~~~~", timestamp: 85.3 + 2 * hihatInterval},
    {text: "~overthinking~~~~~~overthinking~~~~~~overthinking~", timestamp: 85.3 + 3 * hihatInterval},
    {text: "strach", timestamp: 97.5},
    {text: "strachstrachstrachstrachstrachstrach", timestamp: 97.5 + 1 * hihatInterval},
    {text: "     strach     ", timestamp: 97.5 + 2 * hihatInterval},
    {text: "      strach          strach         strach     ", timestamp: 97.5 + 3 * hihatInterval},
    {text: "blask", timestamp: 103.5},
    {text: "$ $ $ $ $ $ $ $ $ $ $ $", timestamp: 107.9},
    {text: "$ € ¥ £ ฿ $ € ¥ £ ฿ $ € ¥ £ ฿", timestamp: 110.9},
    {text: "                                                                              ", timestamp: 117.0},
    {text: "$$$ stówa $ $  na $ $ godzine $$$", timestamp: 120},
    {text: " ? ? ? czy to flex jest ? ? ? ", timestamp: 126.5},
    {text: "taniej bity dać", timestamp: 132.5},
    {text: "   jak   lece   ", timestamp: 134},
    {text: "nie potrzebuje zniżki", timestamp: 135},
    {text: "mam na te bity penge", timestamp: 136.5},
    {text: "mamy kolejny bangier", timestamp: 138},
    {text: "najba mjusik", timestamp: 139.6},
    {text: "życie jest piękne", timestamp: 141},
    {text: "⛰️⛰️⛰️muszę popchnąć to na szczyty   ⛰️⛰️⛰", timestamp: 144.5},
    {text: "⛰️⛰️⛰️mati podsyła mi hity   ⛰️⛰️⛰", timestamp: 146},
    {text: "⛰️⛰️⛰   ziomal podsyła mi bity   ⛰️⛰️⛰", timestamp: 147.5},
    {text: "⛰️⛰️⛰   czekam na miks robie klipy   ⛰️⛰️⛰", timestamp: 149},
    {text: "? ? ? co tam ? ? ?", timestamp: 154.0},
    {text: "! ! ! szukam do tego ludzi ! ! !", timestamp: 155.5},
    {text: "podbij", timestamp: 156.9},
    {text: "stawki i ogień", timestamp: 158.4},
    {text: "graficy programiści", timestamp: 159.9},
    {text: "płynną forse", timestamp: 161.5},
    {text: "KOCHAM O HAJS WYŚCIG", timestamp: 163},
    {text: "BIORĘ TO CO MOJE", timestamp: 164.5},
    {text: "I TO JEST HUSTLA", timestamp: 165.9},
    {text: "A NIE W BRAMIE Z ZIOŁEM", timestamp: 167},

    {text: "", timestamp: 200}, // end item required
];
let currentDrawingTaskId = 0;
const startingTimestamp = 0;

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
    const startTime = Date.now();
    setInterval(() => {
        console.info(`Time ${startingTimestamp + (Date.now() - startTime) / 1000} s`);
    }, 1000);
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