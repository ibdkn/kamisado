import React from 'react';
import './App.css';
import {GameController} from "./components/GameController/GameController";

const App = () => {

    return (
        <div className={"App"}>
            <h1>Kamisado</h1>
            <GameController/>
        </div>
    );
};

export default App;