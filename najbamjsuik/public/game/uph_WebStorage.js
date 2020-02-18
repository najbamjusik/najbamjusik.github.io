///@function saveInLocalStorage(filepath, data)
///@param {String} filepath
///@param {String} data
function saveInLocalStorage(filepath, data) {
    console.debug("[WebStorage]", "saveInLocalStorage:", filepath, "file length:", data.length);
    // TODO Size checking
    localStorage.setItem(filepath, data);
    return "{}";
}

///@function loadFromServer(filepath)
///@param {String} filepath
function loadFromServer(filepath) {
    console.debug("[WebStorage]", "loadFromServer:", filepath);
    const xmlhttp = new XMLHttpRequest();
    xmlhttp.open("GET", filepath, false);
    xmlhttp.send();
    return xmlhttp.status == 200 ? xmlhttp.responseText : "{}";
}

///@function loadFromLocalStorage(filepath)
///@param {String} filepath
function loadFromLocalStorage(filepath) {
    const data = localStorage.getItem(filepath)
    return data == null ? "{}" : data;
}

///@function load(filepath)
///@param {String} filepath
function load(filepath) {
    console.debug("[WebStorage]", "load:", filepath)
    if (localStorage.getItem(filepath) == null) {
        console.debug("[WebStorage]", "load:", filepath, "file not found in localStorage, getting file from server");
        const data = loadFromServer(filepath);
        console.debug("[WebStorage]", "load:", filepath, (data == "{}" ? "file not found in server" : "file length: " + data.length));
        localStorage.setItem(filepath, data);
    }

    return localStorage.getItem(filepath);
}