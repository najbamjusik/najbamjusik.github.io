function saveScreen(base64Data) {
    const dlLink = document.createElement('a');
    dlLink.download = `krulig-ballada-o-dojrzalosci-${Date.now()}.jpg`;
    dlLink.href = base64Data;

    document.body.appendChild(dlLink);
    dlLink.click();
    document.body.removeChild(dlLink);
}

function takeScreenshot(score, userId) {
    const imageHeight = 800;
    const imageWidth = 450;

    const img = document.getElementById('memeBackground');
    const canvas = document.getElementById('memecanvas');
    canvas.width = imageWidth;
    canvas.height = imageHeight;
    const ctx = canvas.getContext('2d');
    ctx.strokeStyle = '#FF00FF';
    ctx.fillStyle = 'black';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'top';


    ctx.drawImage(img, 0, 0, imageWidth, imageHeight);
    const descriptionFont = `oblique small-caps bold 30px press-start-font`;
    const scoreFont = `oblique small-caps bold 68px press-start-font`;
    const userIdFont = `oblique normal normal 12px press-start-font`;
    drawText(ctx, "punkty dojrzalosci", imageWidth / 2, imageHeight / 3, descriptionFont, 4);
    drawText(ctx, score + "", imageWidth / 2, imageHeight / 3 + 30 + 10, scoreFont, 8);
    drawText(ctx, userId.slice(0,23), imageWidth / 2, imageHeight / 3 + 30 + 10 + 68 + 10, userIdFont, 1);
    saveScreen(canvas.toDataURL());

}

function drawText(ctx, text, x, y, font, lineWidth) {
    ctx.lineWidth = lineWidth;
    ctx.font = font;
    ctx.strokeText(text, x, y);
    ctx.fillText(text, x, y);
}
