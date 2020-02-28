const DOJRZALOSC = "KRULIG_DOJRZALOSC";
const DZBAN_POLICJA = "DZBAN_POLICJA";

const clientIdKey = "3770d3a4-ffe0-462b-8b24-a2b1748d4e08";
const clientVisitCounterKey = "3770d3a4-ffe0-462b-8b24-a2b1748d1111";

const sessionId = createUUID();
const clientId = initClientId();
const content_category = "spaace-rap";
emitUserEntered();

/***
 *
 User Events
 - UserEntered, count
 - UserDownloadRules
 - UserScrolledDownOnInfo
 - UserClickedPlayButton
 - UserScrolledDownOnGame
 GameEvents
 - GameStarted
 - GamePlaying
 - GameFinished
 Na ekranie koncowym:
 - GameFinishRestarted
 - GameFinishScreenShoot
 - GameFinishYoutube
 */

function emitGTag(eventName, params) {
    gtag('event', eventName, {
        ...params,
        clientId,
        sessionId,
        content_category,
    });
}

function emitFBPixel(eventName, params) {
    fbq('trackCustom', eventName, {
        ...params,
        clientId,
        sessionId,
        content_category,
    });
}

function emitUserEntered() {
    let clientVisitCount = window.sessionStorage.getItem(clientVisitCounterKey);
    if(!clientVisitCount || parseInt(clientVisitCount) == 1){
        const eventName = "UserEnteredNew";
        emitGTag(eventName, {});
        emitFBPixel(eventName, {})
    } else {
        const eventName = "UserEnteredReturning";
        emitGTag(eventName, {clientVisitCount});
        emitFBPixel(eventName, {clientVisitCount})
    }
}

function emitUserDownloadedRules() {
    const eventName = "UserDownloadedRules";
    emitGTag(eventName, {});
    emitFBPixel(eventName, {})
}

function emitUserScrolledDownOnInfo() {
    const eventName = "UserScrolledDownOnInfo";
    emitGTag(eventName, {});
    emitFBPixel(eventName, {})
}

function emitUserClieckedPlayButton() {
    const eventName = "UserClickedPlay";
    emitGTag(eventName, {});
    emitFBPixel(eventName, {})

}

function emitUserSCrolledDownOnGame() {
    const eventName = "UserScrolledDownOnGame";
    emitGTag(eventName, {});
    emitFBPixel(eventName, {})

}

function emitGameEvent(rawGameType, rawEventName, rawParams) {
    const gameType = getGameType(rawGameType);
    if (!gameType) {
        return;
    }

    const params = JSON.parse(rawParams.split("'").join('"'));
    const score = params.score;
    const time = Math.round(params.time);
    const ammo = params.ammo;
    const gameCounter = params.gameCounter;
    const gameParams = {
        time, score, ammo, gameCounter, content_name: gameType
    };

    switch (rawEventName) {
        case "GameStarted":
            emitFBPixel("GameStarted", gameParams);
            emitGTag("GameStarted", gameParams);
            return;
        case "GamePlaying":
            emitFBPixel("GamePlaying", gameParams);
            emitGTag("GamePlaying", gameParams);
            return;
        case "GameFinished":
            emitFBPixel("GameFinished", gameParams);
            emitGTag("GameFinished", gameParams);
            return;
        case "GameFinishedRestarted":
            emitFBPixel("GameFinishedRestarted", gameParams);
            emitGTag("GameFinishedRestarted", gameParams);
            return;
        case "GameFinishedScreenshot":
            console.log("asd");
            emitFBPixel("GameFinishedScreenshot", gameParams);
            emitGTag("GameFinishedScreenshot", gameParams);
            takeScreenshot(score, clientId);
            return;
        case "GameFinishedYoutube":
            emitFBPixel("GameFinishedYoutube", gameParams);
            emitGTag("GameFinishedYoutube", gameParams);
            window.open('https://www.youtube.com/watch?v=4nKiYG2s5P0&list=PLUWx5xffh4KAMbGydRAaLlyuMaA5c6r0f&index=2&t=0s', '_blank');
            return;
        default:
            console.error("Unknown event name " + rawEventName);
    }
}

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

function initClientId() {
    let clientId = window.localStorage.getItem(clientIdKey);
    if (!clientId) {
        clientId = createUUID();
        window.localStorage.setItem(clientIdKey, clientId);
        window.localStorage.setItem(clientVisitCounterKey, 1 + "");
    } else {
        let clientVisitCount = window.localStorage.getItem(clientVisitCounterKey);
        window.localStorage.setItem(clientVisitCounterKey, parseInt(clientVisitCount || 0) + 1 + "");
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

