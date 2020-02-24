const DOJRZALOSC = "KRULIG_DOJRZALOSC";
const DZBAN_POLICJA = "DZBAN_POLICJA";

const sessionId = createUUID();
const clientId = initClientId();

/***
 *
 * generateUuid, store
 * UerEntered, count
 * rules
 * scrolledDownOnInfo
 * playButtonClicked
 * GameEvents
 *      GameStarted, count
 *      GamePlaying
 *      GameFinished
 *      GameScreenShoot
 * scrolledDownOnGame
 */



var gameEvent = function (rawGameType, rawEventName, rawParams) {
    const gameType = getGameType(rawGameType);
    if (!gameType) {
        return;
    }
    const params = JSON.parse(rawParams.split("'").join('"'));
    const score = params.score;
    const time = Math.round(params.time);
    const gameCounter = params.gameCounter;

    // console.log({gameType, gameCounter, time, score, sessionId});

    putGAGameEvent("GamePlaying");

    if (time === 0) {
        if (gameCounter > 1) {
            putPixelGameEvent("GameRestarted");
        } else {
            putPixelGameEvent("GameStarted");
        }
        return;
    }

    if (isEndOfGame(gameType, time)) {
        putPixelGameEvent("GameFinished");
        return;
    }

    if (time === 60) {
        putPixelGameEvent("GamePlaying");
    }

    if (time === 120) {
        putPixelGameEvent("GamePlaying");
    }

    function putPixelGameEvent(eventName) {
        fbq('trackCustom', eventName, {
            clientId,
            sessionId,
            content_name: gameType,
            content_category: "game",
            gameCounter,
            time,
            score,
        });
    }

    function putGAGameEvent(eventName) {
        gtag('event', eventName, {
            clientId,
            sessionId,
            content_name: gameType,
            content_category: "game",
            gameCounter,
            time,
            score,
        });
    }
};

function getGameType(gameTypeRaw) {
    if (gameTypeRaw.endsWith("policje-nalezy-pierdolic")) {
        return DZBAN_POLICJA;
    } else if (gameTypeRaw.endsWith("ballada-o-dojrzalosci")) {
        return DOJRZALOSC;
    } else {
        console.error("unknown gameTypeRaw", gameTypeRaw);
        return undefined;
    }
}

function isEndOfGame(gameType, time) {
    switch (gameType) {
        case DOJRZALOSC:
            return time === 169;
        case DZBAN_POLICJA:
            return time === 122;
        default:
            console.error("No end time defined for " + gameType);
            return false;
    }
}

function initClientId() {
    const clientIdKey = "3770d3a4-ffe0-462b-8b24-a2b1748d4e08";

    let clientId = window.sessionStorage.getItem(clientIdKey);
    if (!clientId) {
        clientId = createUUID();
        window.localStorage.setItem(clientIdKey, clientId);
        gtag('event', 'NewUserEntered', {
            clientId,
            sessionId,
            content_category: "game",
        });
        fbq('trackCustom', 'NewUserEntered', {
            clientId,
            sessionId,
            content_category: "game",
        });
    } else {
        gtag('event', 'ReturningUserEntered', {
            clientId,
            sessionId,
            content_category: "game",
        });
        fbq('trackCustom', 'NewUserEntered', {
            clientId,
            sessionId,
            content_category: "game",
        });
    }
    return clientId;
}

function createUUID() {
    // http://www.ietf.org/rfc/rfc4122.txt
    var s = [];
    var hexDigits = "0123456789abcdef";
    for (var i = 0; i < 36; i++) {
        s[i] = hexDigits.substr(Math.floor(Math.random() * 0x10), 1);
    }
    s[14] = "4";  // bits 12-15 of the time_hi_and_version field to 0010
    s[19] = hexDigits.substr((s[19] & 0x3) | 0x8, 1);  // bits 6-7 of the clock_seq_hi_and_reserved to 01
    s[8] = s[13] = s[18] = s[23] = "-";

    var uuid = s.join("");
    return uuid;
}

