import React, {useEffect} from 'react';
import './App.css';
// eslint-disable-next-line
import {InfoPopup} from "./InfoPopup";

function App() {
    useEffect(() => {
        console.log("Loading Game ...");
        appendJSToDOM(`${process.env.PUBLIC_URL}/game/ballada-o-dojrzalosci.js`)
    });

    return (
        <div className="App">
            <InfoPopup/>
        </div>
    )
}

export default App;

function appendJSToDOM(url: string) {
    const scriptTag = document.createElement("script");
    scriptTag.src = url;
    document.body.appendChild(scriptTag);
    scriptTag.onload = function() {
        console.log("Game loaded");
        (global as any).GameMaker_Init();
    }
}

