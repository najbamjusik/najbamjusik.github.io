function takeScreenshot() {
    html2canvas(document.querySelector("#canvas")).then(canvas => {
        // document.body.appendChild(canvas)
        saveScreen(canvas.toDataURL());
    });

}

function saveScreen(base64Data) {
    const dlLink = document.createElement('a');
    dlLink.download = `krulig-ballada-o-dojrzalosci-${Date.now()}.jpg`;
    dlLink.href = base64Data;

    document.body.appendChild(dlLink);
    dlLink.click();
    document.body.removeChild(dlLink);
}
