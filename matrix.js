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

let currentDrawingTaskId = 0;
let drawingInterval;
const config = {
    startingTimestamp: 0,
    entryStepDurationMsSlow: 100,
    entryStepDurationMsFaster: 60,
    entryOffsetMs: 1000,
    dissapearMask: '#0001',
    hihatInterval: 1.5,
};
const timeline = buildTimeline();
console.log(timeline);
async function run(drawingTaskId, startingTimestamp) {
    const audio = document.getElementById("audio-element");
    audio.currentTime = startingTimestamp;
    const startTime = Date.now();

    let currentTimelineEntryIndex = -1;
    drawingInterval = setInterval(async () => {
        const currentTime = startingTimestamp + (Date.now() - startTime) / 1000;
        console.info(`Time ${currentTime} s`);
        const currentTimelineEntry = timeline.find((timelineEntry, idx, arr) => {
            const isLast = idx === arr.length - 1;
            if (isLast) {
                return false;
            }
            const nextEntry = arr[idx + 1];
            return timelineEntry.timestamp <= currentTime && currentTime < nextEntry.timestamp;
        });

        if (currentTimelineEntry) {
            if (config.startingTimestamp > 0 && currentTimelineEntryIndex === -1) {
                // for development changeable startingTimestamp
                currentTimelineEntryIndex = currentTimelineEntry.idx;
            }
            if (currentTimelineEntryIndex < currentTimelineEntry.idx) {
                currentTimelineEntryIndex++;
                console.log(currentTimelineEntry);
                await drawText({
                    drawingTaskId,
                    dataToPrint: currentTimelineEntry.text,
                    msDuration: currentTimelineEntry.duration + config.entryOffsetMs,
                    msStepDuration: currentTimelineEntry.entryStepSpeed
                });
            }
        }
    }, 100);
}

async function drawText({drawingTaskId, dataToPrint, msDuration, msStepDuration}) {
    const startTime = Date.now();
    const ypositions = Array(columns).fill(0);

    function step() {
        ctx.fillStyle = config.dissapearMask;
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
        await sleep(msStepDuration);
    }
}

function musicPlaying() {
    currentDrawingTaskId++;
    run(currentDrawingTaskId, config.startingTimestamp);
}

function musicStopped() {
    currentDrawingTaskId++;
    if (drawingInterval) {
        clearInterval(drawingInterval);
    }
}

let initialRunTriggered = false;

function musicLoaded() {
    if (!initialRunTriggered && !isMobile()) {
        document.getElementById("player-button").click();
        initialRunTriggered = true;
    }
}

function buildTimeline() {
    const {hihatInterval} = config;
    const rawTimeline = [
        {text: "x y z", timestamp: 0, entryStepSpeed: config.entryStepDurationMsSlow},
        {text: "jo", timestamp: 2},
        {text: "dominik krulig bugz", timestamp: 3},
        {text: "najba mjusik", timestamp: 5},
        {text: "??? ??? ??? ??? ??? ??? ??? ???", timestamp: 8},


        {text: "rzuciłem studia", timestamp: 12},
        {text: "w chuj hajs", timestamp: 18},


        {text: "do jutra", timestamp: 23, entryStepSpeed: config.entryStepDurationMsFaster},
        {text: "do jutra", timestamp: 23.8},
        {text: "z ziomami", timestamp: 25.9},
        {text: "za rzadko spotykamy", timestamp: 28.9},
        {text: "ziomy tęsknią", timestamp: 32.2},
        {text: "swoją karierę", timestamp: 35.1},
        {text: "w obce miasto", timestamp: 37.8},
        {text: "nie widzimy się za czesto", timestamp: 40.9},
        {text: "     z a d z w o n     ", timestamp: 44.2, entryStepSpeed: config.entryStepDurationMsSlow},

        {text: "na pewno", timestamp: 47},
        {text: "na pewno", timestamp: 47.8},
        {text: "na ruchy przestzeń", timestamp: 52.8},

        {text: "ile", timestamp: 56.8},
        {text: "? ? ? ? ? ile ? ? ? ? ?", timestamp: 57.8},

        {text: "więcej", timestamp: 58.8},
        {text: "więcej", timestamp: 59.7},
        {text: "żałuję przed snem", timestamp: 64.4},


        {text: "strach", timestamp: 72.4},
        {text: "strachstrachstrachstrachstrachstrach", timestamp: 72.4 + 1 * hihatInterval},
        {text: "     strach     ", timestamp: 72.4 + 2 * hihatInterval},
        {text: "      strach          strach         strach     ", timestamp: 72.4 + 3 * hihatInterval},
        {text: "     strach     ", timestamp: 72.4 + 3 * hihatInterval},
        {text: "      strach          strach         strach     ", timestamp: 72.4 + 4 * hihatInterval},
        {text: "     strach     ", timestamp: 72.4 + 5 * hihatInterval},


        {text: "overthinking", timestamp: 85.7},
        {text: "over?overthinking?thinking", timestamp: 85.6 + 1 * hihatInterval},
        {text: "~~~~~~overthinking~~~~~~", timestamp: 85.6 + 2 * hihatInterval},
        {text: "~overthinking~~~~~~overthinking~~~~~~overthinking~", timestamp: 85.6 + 3 * hihatInterval},
        {text: "~overthinking~~~~~~overthinking~~~~~~overthinking~", timestamp: 85.6 + 4 * hihatInterval},
        {text: "~overthinking~~~~~~overthinking~~~~~~overthinking~", timestamp: 85.6 + 5 * hihatInterval},
        {text: "~overthinking~~~~~~overthinking~~~~~~overthinking~", timestamp: 85.6 + 6 * hihatInterval},

        {text: "strach", timestamp: 97.6},
        {text: "strachstrachstrachstrachstrachstrach", timestamp: 97.5 + 1 * hihatInterval},
        {text: "     strach     ", timestamp: 97.6 + 2 * hihatInterval},
        {text: "      strach          strach         strach     ", timestamp: 97.5 + 3 * hihatInterval},
        {text: "     strach     ", timestamp: 97.6 + 4 * hihatInterval},

        {text: "blask", timestamp: 102.1},
        {text: "$ $ $ $ $ $ $ $ $ $ $ $", timestamp: 105.0},
        {text: "$ € ¥ £ ฿ $ € ¥ £ ฿ $ € ¥ £ ฿", timestamp: 110.9},
        {text: "                                                                              ", timestamp: 117.0},


        {text: "$$$ stówa $ $  na $ $ godzine $$$", timestamp: 120},
        {text: " ? ? ? czy to flex jest ? ? ? ", timestamp: 126.7},
        {text: "      widze sens     ", timestamp: 129.4},
        {text: "      pierdole turbulencje     ", timestamp: 131.0},


        {text: "taniej bity dać", timestamp: 131.5},
        {text: "   jak   lece   ", timestamp: 133},
        {text: "nie potrzebuje zniżki", timestamp: 134.5},
        {text: "mam na te bity penge", timestamp: 136.0},
        {text: "mamy kolejny bangier", timestamp: 137.0},
        {text: "najba mjusik", timestamp: 138.6},
        {text: "życie jest piękne", timestamp: 140.1},


        {text: "⛰️⛰️⛰️muszę popchnąć to na szczyty   ⛰️⛰️⛰", timestamp: 144.1},
        {text: "⛰️⛰️⛰️mati podsyła mi hity   ⛰️⛰️⛰", timestamp: 145.7},
        {text: "⛰️⛰️⛰   ziomal podsyła mi bity   ⛰️⛰️⛰", timestamp: 147.2},
        {text: "⛰️⛰️⛰   czekam na miks robie klipy   ⛰️⛰️⛰", timestamp: 148.7},


        {text: "? ? ? co tam ? ? ?", timestamp: 154.0},
        {text: "! ! ! szukam do tego ludzi ! ! !", timestamp: 155.0},
        {text: "podbij", timestamp: 156.9},
        {text: "stawki i ogień", timestamp: 158.4},
        {text: "graficy programiści", timestamp: 159.9},
        {text: "płynną forse", timestamp: 161.5},


        {text: "KOCHAM O HAJS WYŚCIG", timestamp: 162.0},
        {text: "BIORĘ TO CO MOJE", timestamp: 163.0},
        {text: "I TO JEST HUSTLA", timestamp: 164.0},
        {text: "A NIE W BRAMIE Z ZIOŁEM", timestamp: 165.0},

        {text: "", timestamp: 200}, // end item required
    ];
    let tempSpeed = config.entryStepDurationMsSlow; // fallback
    return rawTimeline.map((timelineEntry, idx, arr) => {
        const isLast = idx === arr.length - 1;
        let duration;
        if (isLast) {
            duration = 10 * 1000;
        } else {
            const nextTimelineEntry = arr[idx + 1];
            const durationSec = nextTimelineEntry.timestamp - timelineEntry.timestamp;
            duration = Math.floor(durationSec * 1000);
        }
        if (timelineEntry.entryStepSpeed) {
            tempSpeed = timelineEntry.entryStepSpeed;
        }
        return {...timelineEntry, idx: idx, duration, entryStepSpeed: tempSpeed};
    });
}