import React from 'react';
import styles from './Tower.module.css';

export type PositionType = {
    x: number;
    y: number
}

export type Tower = {
    position: PositionType
    player: number
    color: string
};

export type TowerProps = {
    tower: Tower,
    getTowerInfo: (towerPosition: PositionType, player: number, towerColor: string) => void
    isActive: boolean
    moveTower: (position: PositionType, color: string) => void
};

const CELL_SIZE = 100;

export const Tower = ({tower, getTowerInfo, isActive, moveTower}: TowerProps) => {
    const translateX = (tower.position.x - 1) * CELL_SIZE;
    const translateY = (tower.position.y - 1) * CELL_SIZE;

    const style = {
        backgroundColor: tower.color,
        transform: `translate(${translateX}px, ${translateY}px)`
    };

    const handleClick = () => {
        getTowerInfo(tower.position, tower.player, tower.color);

        // Программный вызов клика на клетке
        const cellElement = document.querySelector(`[data-position="${tower.position.x}-${tower.position.y}"]`);
        if (cellElement) {
            cellElement.dispatchEvent(new MouseEvent('click', { bubbles: true }));
        }
    };

    const moveHandle = () => {
        // moveTower(tower.position);
    }

    // Определение класса для башни в зависимости от игрока
    const playerClass = tower.player === 1 ? styles.player1 : styles.player2;

    return (
        <div data-type="tower"
             className={isActive ? `${styles.tower} ${playerClass} ${styles.active}` : `${styles.tower} ${playerClass}`}
             style={style}
             onClick={handleClick}></div>
    );
};

