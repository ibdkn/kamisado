import React, {useState} from 'react';
import styles from './Board.module.css';
import {Cell} from "../Cell/Cell";
import {PositionType, Tower} from "../Tower/Tower";
import {log} from "node:util";

// Роль:
// Отображение игрового поля. Оно включает в себя сетку из клеток, на которых размещаются башни.
//
// Функции:
// 	•	Рендеринг сетки клеток с заданными цветами.
// 	•	Размещение башен в правильных позициях.
// 	•	Передача событий кликов на клетки для обработки в App или GameController.
// 	•	Поддержка корректного отображения башен поверх клеток.

const colors = [
    '#593121', '#6eb2a9', '#31539b', '#d0a915', '#e64675', '#2f8540', '#c53f2d', '#e9672f', // Строка 1
    '#2f8540', '#593121', '#d0a915', '#c53f2d', '#6eb2a9', '#e64675', '#e9672f', '#31539b', // Строка 2
    '#c53f2d', '#d0a915', '#593121', '#2f8540', '#31539b', '#e9672f', '#e64675', '#6eb2a9', // Строка 3
    '#d0a915', '#31539b', '#6eb2a9', '#593121', '#e9672f', '#c53f2d', '#2f8540', '#e64675', // Строка 4
    '#e64675', '#2f8540', '#c53f2d', '#e9672f', '#593121', '#6eb2a9', '#31539b', '#d0a915', // Строка 5
    '#6eb2a9', '#e64675', '#e9672f', '#31539b', '#2f8540', '#593121', '#d0a915', '#c53f2d', // Строка 6
    '#31539b', '#e9672f', '#e64675', '#6eb2a9', '#c53f2d', '#d0a915', '#593121', '#2f8540', // Строка 7
    '#e9672f', '#c53f2d', '#2f8540', '#e64675', '#d0a915', '#31539b', '#6eb2a9', '#593121', // Строка 8
];

type BoardProps = {
    towers: Tower[]
    determineCurrentPlayer: (player: number) => void
    determineCurrentTower: (position: PositionType, player: number, color: string) => void
    onTowerClick: (position: PositionType) => void
    activeTower: PositionType | null

    possibleWay: PositionType[] | null
};

export const Board = ({ towers, determineCurrentPlayer, determineCurrentTower, onTowerClick, activeTower, possibleWay }: BoardProps) => {


    const handleCellClick = (position: PositionType, color: string) => {
        // console.log('CELL: ', position, color);
    };

    const handleTowerClick = (position: PositionType, player: number, color: string) => {
        determineCurrentPlayer(player);
        determineCurrentTower(position, player, color);
    };

    // render Cells and Towers
    const getCellColor = (x: number, y: number) => {
        const index = y * 8 + x;
        return colors[index];
    };
    const renderCells = () => {
        const cells = [];
        for (let y = 0; y < 8; y++) {
            for (let x = 0; x < 8; x++) {
                const color = getCellColor(x, y);
                const position = {x: x + 1, y: y + 1}
                cells.push(
                    <Cell key={`${x + 1}-${y + 1}`} position={position} color={color} getCellInfo={handleCellClick} possibleWay={possibleWay}/>
                );
            }
        }
        return cells;
    };
    const renderTowers = () => {
        return towers.map((tower, index) => (
            <Tower key={index}
                   tower={tower}
                   getTowerInfo={handleTowerClick}
                   isActive={activeTower?.x === tower.position.x && activeTower?.y === tower.position.y}
                   onTowerClick={onTowerClick}
            />
        ));
    };

    return (
        <div className={styles.board}>
            {renderCells()}
            {renderTowers()}
        </div>
    );
};
