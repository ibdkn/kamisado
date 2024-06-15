import React, { useState } from 'react';
import styles from './GameController.module.css';
import {Board} from "../Board/Board";

const initialTowers = [
    { color: '#593121', position: { x: 0, y: 0 }, player: 1 },
    { color: '#6eb2a9', position: { x: 1, y: 0 }, player: 1 },
    { color: '#31539b', position: { x: 2, y: 0 }, player: 1 },
    { color: '#d0a915', position: { x: 3, y: 0 }, player: 1 },
    { color: '#e64675', position: { x: 4, y: 0 }, player: 1 },
    { color: '#2f8540', position: { x: 5, y: 0 }, player: 1 },
    { color: '#c53f2d', position: { x: 6, y: 0 }, player: 1 },
    { color: '#e9672f', position: { x: 7, y: 0 }, player: 1 },

    { color: '#e9672f', position: { x: 0, y: 7 }, player: 2 },
    { color: '#c53f2d', position: { x: 1, y: 7 }, player: 2 },
    { color: '#2f8540', position: { x: 2, y: 7 }, player: 2 },
    { color: '#e64675', position: { x: 3, y: 7 }, player: 2 },
    { color: '#d0a915', position: { x: 4, y: 7 }, player: 2 },
    { color: '#31539b', position: { x: 5, y: 7 }, player: 2 },
    { color: '#6eb2a9', position: { x: 6, y: 7 }, player: 2 },
    { color: '#593121', position: { x: 7, y: 7 }, player: 2 },
];

type Tower = {
    color: string;
    position: { x: number; y: number };
    player: number;
};

export const GameController: React.FC = () => {
    const [towers, setTowers] = useState<Tower[]>(initialTowers);
    console.log(towers)

    return (
        <div className={styles.gameController}>
            <Board towers={towers} />
        </div>
    );
};
