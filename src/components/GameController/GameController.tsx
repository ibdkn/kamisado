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
    const [towers, setTowers] = useState<Tower[]>(initialTowers);

    const [currentPlayer, setCurrentPlayer] = useState<number>(1);

    const [activeTower, setActiveTower] = useState<Tower | null>(null);

    const [possibleWay, setPossibleWays] = useState<PositionType[] | null>(null)

    useEffect(() => {
        if (activeTower) {
            const possibleMoves = getPossibleMoves(activeTower.position.x, activeTower.position.y, activeTower.player, towers);
            setPossibleWays(possibleMoves);
        }
    }, [activeTower, towers]);

    const getCurrentPlayer = (player: number) => {
        setCurrentPlayer(player);
    }

    // Функция для перемещения башни
    const moveTower = (cellPosition: PositionType, cellColor: string) => {
        if (activeTower && possibleWay) {
            // Проверяем, что кликнутая клетка является допустимой для перемещения
            const isMoveValid = possibleWay.some(
                (move) => move.x === cellPosition.x && move.y === cellPosition.y
            );

            if (isMoveValid) {
                // Перемещаем активную башню
                setTowers(towers.map(tower =>
                    tower.player === currentPlayer && tower.position.x === activeTower.position.x && tower.position.y === activeTower.position.y && tower.color === activeTower.color
                        ? { ...tower, position: cellPosition }
                        : tower
                ));

                // Очищаем возможные пути после перемещения
                setPossibleWays(null);

                // Определяем следующую активную башню на основе цвета клетки
                const nextTurnTower = towers.find(tower => tower.player !== currentPlayer && tower.color === cellColor);
                if (nextTurnTower) {
                    setActiveTower(nextTurnTower);
                    const possibleMoves = getPossibleMoves(nextTurnTower.position.x, nextTurnTower.position.y, nextTurnTower.player, towers);
                    setPossibleWays(possibleMoves);
                }

                // Меняем текущего игрока
                setCurrentPlayer(currentPlayer === 1 ? 2 : 1);
            }
        }
    };

    const handleTowerClick = (position: PositionType, player: number, color: string) => {
        setActiveTower({position, player, color});
        const possibleMoves = getPossibleMoves(position.x, position.y, player, towers);
        setPossibleWays(possibleMoves);
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
                if(y + 1 <= 8) {
                    const move = {x: x, y: y + i}
                    if(isPositionOccupied(move)) break;
                    moves.push(move);
                }
            }
            // Движение вниз-влево
            for (let i = 1; i < 8; i++) {
                if(x - i >= 1 && y + i <= 8) {
                    const move = {x: x - i, y: y + i}
                    if(isPositionOccupied(move)) break;
                    moves.push(move);
                }
            }
            // Движение вниз-вправо
            for (let i = 1; i < 8; i++) {
                if(x + i <= 8 && y + i <= 8) {
                    const move = {x: x + i, y: y + i}
                    if(isPositionOccupied(move)) break;
                    moves.push(move);
                }
            }
        }

        // Игрок 2: движение вверх и по диагонали вверх
        if (player === 2) {
            // Движение вверх
            for (let i = 1; i < 8; i++) {
                if(y - i >= 1) {
                    const move = {x: x, y: y - i}
                    if(isPositionOccupied(move)) break;
                    moves.push(move);
                }
            }
            // Движение вверх-влево
            for (let i = 1; i < 8; i++) {
                if(x - i >= 1 && y - i >= 1) {
                    const move = {x: x - i, y: y - i}
                    if(isPositionOccupied(move)) break;
                    moves.push(move);
                }
            }
            // Движение вверх-вправо
            for (let i = 1; i < 8; i++) {
                if(x + i <= 8 && y - i >= 1) {
                    const move = {x: x + i, y: y - i}
                    if(isPositionOccupied(move)) break;
                    moves.push(move);
                }
            }
        }

        return moves;
    };


    return (
        <div className={styles.gameController}>
            <Board towers={towers}
                   getCurrentPlayer={getCurrentPlayer}
                   activeTower={activeTower}
                   onTowerClick={handleTowerClick}
                   possibleWay={possibleWay}
                   moveTower={moveTower}/>
        </div>
    );
};
