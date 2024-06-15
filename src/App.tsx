import React, {useState} from 'react';
import './App.css';
import {GameController} from "./components/GameController/GameController";
import {PositionType, Tower} from "./components/Tower/Tower";

// Роль:
// Главный компонент приложения, который инициализирует и управляет состоянием игры. Он служит контейнером для всех
// остальных компонентов и управляет общим состоянием игры.
//
// 	Функции:
// 	•	Инициализация состояния игры.
// 	•	Обработка обновлений состояния, таких как смена хода, перемещение башен и определение победителя.
// 	•	Рендеринг игрового поля и контроллеров.

const App = () => {

    const move = () => {
    }

    return (
        <div className={"App"}>
            <h1>Kamisado</h1>
            <GameController/>
        </div>
    );
};

export default App;