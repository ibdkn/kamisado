import React, {useEffect, useState} from 'react';
import styles from './GameController.module.css';
import {Board} from "../Board/Board";
import {PositionType, Tower} from "../Tower/Tower";

const initialTowers = [
    // player 1
    { color: '#593121', position: { x: 1, y: 1 }, player: 1 },
    { color: '#6eb2a9', position: { x: 2, y: 1 }, player: 1 },
    { color: '#31539b', position: { x: 3, y: 1 }, player: 1 },
    { color: '#d0a915', position: { x: 4, y: 1 }, player: 1 },
    { color: '#e64675', position: { x: 5, y: 4 }, player: 1 }, // changed for test
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
    const [towers, setTowers] = useState<Tower[]>(initialTowers);

    const [currentPlayer, setCurrentPlayer] = useState<number>(1);

    const [activeTower, setActiveTower] = useState<Tower | null>(null);

    const [possibleWay, getPossibleWays] = useState<PositionType[] | null>(null)

    const getCurrentPlayer = (player: number) => {
        setCurrentPlayer(player);
    }

    useEffect(() => {
        setCurrentPlayer(currentPlayer);
    }, [currentPlayer]);


    // const handleTowerClick = (position: PositionType, player: number, color: string) => {
    //     setActiveTower({position, player, color});
    //
    //     getPossibleMoves(position.x, position.y, player);
    // };

    const handleTowerClick = (position: PositionType, player: number, color: string) => {
        setActiveTower({position, player, color});
        const possibleMoves = getPossibleMoves(position.x, position.y, player, towers);
        getPossibleWays(possibleMoves);
    };

    const getPossibleMoves = (x: number, y: number, player: number, towers: Tower[]) => {
        const moves: PositionType[] = [];

        // Функция для проверки, занята ли клетка другой башней
        const isPositionOccupied = (pos: PositionType) => {
            return towers.some(tower => tower.position.x === pos.x && tower.position.y === pos.y);
        };

        // Игрок 1: движение вниз и по диагонали вниз
        if (player === 1) {
            // Движение вниз
            for (let i = 1; i < 8; i++) {
                if (y + i <= 8) {
                    const move = { x: x, y: y + i };
                    if (isPositionOccupied(move)) break;
                    moves.push(move);
                }
            }
            // Движение вниз-влево
            for (let i = 1; i < 8; i++) {
                if (x - i >= 1 && y + i <= 8) {
                    const move = { x: x - i, y: y + i };
                    if (isPositionOccupied(move)) break;
                    moves.push(move);
                }
            }
            // Движение вниз-вправо
            for (let i = 1; i < 8; i++) {
                if (x + i <= 8 && y + i <= 8) {
                    const move = { x: x + i, y: y + i };
                    if (isPositionOccupied(move)) break;
                    moves.push(move);
                }
            }
        }

        // Игрок 2: движение вверх и по диагонали вверх
        if (player === 2) {
            // Движение вверх
            for (let i = 1; i < 8; i++) {
                if (y - i >= 1) {
                    const move = { x: x, y: y - i };
                    if (isPositionOccupied(move)) break;
                    moves.push(move);
                }
            }
            // Движение вверх-влево
            for (let i = 1; i < 8; i++) {
                if (x - i >= 1 && y - i >= 1) {
                    const move = { x: x - i, y: y - i };
                    if (isPositionOccupied(move)) break;
                    moves.push(move);
                }
            }
            // Движение вверх-вправо
            for (let i = 1; i < 8; i++) {
                if (x + i <= 8 && y - i >= 1) {
                    const move = { x: x + i, y: y - i };
                    if (isPositionOccupied(move)) break;
                    moves.push(move);
                }
            }
        }

        return moves;
    };

    // const getPossibleMoves = (x: number, y: number, player: number) => {
    //     const moves = [];
    //
    //     if (player === 1) {
    //         // Игрок 1: движение вниз и по диагонали вниз
    //         for (let i = 1; i < 8; i++) {
    //             // Вниз
    //             if (y + i <= 8) {
    //                 moves.push({ x: x, y: y + i });
    //             }
    //             // Вниз-влево
    //             if (x - i >= 1 && y + i <= 8) {
    //                 moves.push({ x: x - i, y: y + i });
    //             }
    //             // Вниз-вправо
    //             if (x + i <= 8 && y + i <= 8) {
    //                 moves.push({ x: x + i, y: y + i });
    //             }
    //         }
    //     } else if (player === 2) {
    //         // Игрок 2: движение вверх и по диагонали вверх
    //         for (let i = 1; i < 8; i++) {
    //             // Вверх
    //             if (y - i >= 1) {
    //                 moves.push({ x: x, y: y - i });
    //             }
    //             // Вверх-влево
    //             if (x - i >= 1 && y - i >= 1) {
    //                 moves.push({ x: x - i, y: y - i });
    //             }
    //             // Вверх-вправо
    //             if (x + i <= 8 && y - i >= 1) {
    //                 moves.push({ x: x + i, y: y - i });
    //             }
    //         }
    //     }
    //
    //     return getPossibleWays(moves);
    // };

    return (
        <div className={styles.gameController}>
            <Board towers={towers}
                   getCurrentPlayer={getCurrentPlayer}
                   activeTower={activeTower}
                   onTowerClick={handleTowerClick}
                   possibleWay={possibleWay}/>
        </div>
    );
};
