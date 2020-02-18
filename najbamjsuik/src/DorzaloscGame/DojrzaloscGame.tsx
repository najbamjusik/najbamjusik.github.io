import React from 'react';
import './DojrzaloscGame.css';

export function DojrzaloscGame() {
    window.addEventListener('resize', () => {
        alert("Musisz odświeżyć stronę po zmianie rozmiaru okna, sory :(");
    });
    const windowWidth = Math.floor(window.innerWidth * 0.6);
    const windowHeight = Math.floor(windowWidth * 0.5625);

    return (
        <React.Fragment>
            <div className="Header">
                <span className="HeaderText" role="img">💿💿💿 najbamjusik.pl 💿💿💿</span>
            </div>

            <div className="game-canvas gm4html5_div_class" id="gm4html5_div_id">
                <canvas id="canvas" width={windowWidth} height={windowHeight}>
                    <p>Your browser doesn't support HTML5 canvas.</p>
                </canvas>
            </div>
        </React.Fragment>
    )
}