import React from 'react';
import styles from './Board.module.css';
import {Cell} from "../Cell/Cell";
import {PositionType, Tower} from "../Tower/Tower";

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
    getCurrentPlayer: (player: number) => void
    onTowerClick: (position: PositionType, player: number, color: string) => void
    activeTower: Tower | null
    possibleWay: PositionType[] | null
};

export const Board = ({ towers, getCurrentPlayer, onTowerClick, activeTower, possibleWay }: BoardProps) => {

    const handleCellClick = (position: PositionType, color: string) => {
        // console.log('CELL: ', position, color);
    };

    const handleTowerClick = (position: PositionType, player: number, color: string) => {
        getCurrentPlayer(player);
        onTowerClick(position, player, color);
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
                   isActive={activeTower?.position.x === tower.position.x && activeTower?.position.y === tower.position.y}
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
