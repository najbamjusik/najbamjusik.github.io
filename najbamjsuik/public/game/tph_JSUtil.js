///@function sortArray(jsonArrayString, isAscendingString)
///@param {String} jsonArrayString
///@param {String} isAscending
///@return {String} jsonSortedArrayString return "ParseException" in case of failure
function sortArray(jsonArrayString, isAscendingString) {
    try {
        const array = JSON.parse(jsonArrayString);
        const isAscending = isAscendingString === "true";
        array.sort((a, b) => isAscending ? a - b : b - a);
        return JSON.stringify(array);
    } catch (exception) {
        console.debug(exception);
        return "ParseException";
    }
}

function gameEventProxy(gameType, eventName, params ) {
    if (!!window["gameEvent"]){
        gameEvent(gameType, eventName, params);
    } else {
        console.log("gameEvent is not defined");
    }
}