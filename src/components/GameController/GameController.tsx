import React, { useState } from 'react';
import styles from './GameController.module.css';
import {Board} from "../Board/Board";
import {PositionType, Tower} from "../Tower/Tower";

// Роль: Управление логикой игры, включая ход игроков, определение победителя и обновление состояния игры.
//
// Функции:
// 	•	Управление текущим состоянием игры (например, чей сейчас ход).
// 	•	Определение правил игры и проверка условий победы.
// 	•	Обработка взаимодействий с пользователем, таких как клики на башни и клетки.
// 	•	Обновление позиций башен и состояний клеток на основе ходов игроков.

const initialTowers = [
    // player 1
    { color: '#593121', position: { x: 1, y: 1 }, player: 1 },
    { color: '#6eb2a9', position: { x: 2, y: 1 }, player: 1 },
    { color: '#31539b', position: { x: 3, y: 1 }, player: 1 },
    { color: '#d0a915', position: { x: 4, y: 1 }, player: 1 },
    { color: '#e64675', position: { x: 5, y: 1 }, player: 1 },
    { color: '#2f8540', position: { x: 6, y: 1 }, player: 1 },
    { color: '#c53f2d', position: { x: 7, y: 1 }, player: 1 },
    { color: '#e9672f', position: { x: 8, y: 1 }, player: 1 },

    // player 2
    { color: '#e9672f', position: { x: 1, y: 8 }, player: 2 },
    { color: '#c53f2d', position: { x: 2, y: 8 }, player: 2 },
    { color: '#2f8540', position: { x: 3, y: 8 }, player: 2 },
    { color: '#e64675', position: { x: 4, y: 8 }, player: 2 },
    { color: '#d0a915', position: { x: 5, y: 8 }, player: 2 },
    { color: '#31539b', position: { x: 6, y: 8 }, player: 2 },
    { color: '#6eb2a9', position: { x: 7, y: 8 }, player: 2 },
    { color: '#593121', position: { x: 8, y: 8 }, player: 2 },
];

type GameControllerProps = {
}

export const GameController = () => {
    const [currentPlayer, setCurrentPlayer] = useState(1);
    const [currentCellColor, setCurrentCellColor] = useState<string>('');
    const [currentTower, setCurrentTower] = useState<Tower | null>(null);

    const [towers, setTowers] = useState<Tower[]>(initialTowers);
    const [activeTower, setActiveTower] = useState<PositionType | null>(null);
    const [possibleWay, getPossibleWays] = useState<PositionType[] | null>(null)

    const determineCurrentTower = (position: PositionType, player: number, color: string) => {
        // console.log(position, player, color)
    }

    const determineCurrentPlayer = (player: number) => {
        setCurrentPlayer(player);
    }

    const handleTowerClick = (position: PositionType) => {
        setActiveTower(position);
        getPossibleMoves(position.x, position.y, currentPlayer)
    };


    const getPossibleMoves = (x: number, y: number, player: number) => {
        const moves = [];

        // Для игрока 1 (движение вверх)
        if (player === 1) {
            for (let i = 1; i < 8; i++) {
                // Вверх
                if (y - i >= 0) {
                    moves.push({ x: x, y: y - i });
                }
                // Вверх-влево
                if (x - i >= 0 && y - i >= 0) {
                    moves.push({ x: x - i, y: y - i });
                }
                // Вверх-вправо
                if (x + i < 8 && y - i >= 0) {
                    moves.push({ x: x + i, y: y - i });
                }
            }
        }

        // Для игрока 2 (движение вниз)
        if (player === 2) {
            for (let i = 1; i < 8; i++) {
                // Вниз
                if (y + i < 8) {
                    moves.push({ x: x, y: y + i });
                }
                // Вниз-влево
                if (x - i >= 0 && y + i < 8) {
                    moves.push({ x: x - i, y: y + i });
                }
                // Вниз-вправо
                if (x + i < 8 && y + i < 8) {
                    moves.push({ x: x + i, y: y + i });
                }
            }
        }

        return getPossibleWays(moves);
    };

    return (
        <div className={styles.gameController}>
            <Board towers={towers}
                   determineCurrentPlayer={determineCurrentPlayer}
                   determineCurrentTower={determineCurrentTower}
                   activeTower={activeTower}
                   onTowerClick={handleTowerClick}
                   possibleWay={possibleWay}/>
        </div>
    );
};
