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
};


export const Tower = ({tower, getTowerInfo, isActive}: TowerProps) => {
    const style = {
        backgroundColor: tower.color,
        top: `${(tower.position.y - 1) * 100}px`, // Позиционирование по оси Y
        left: `${(tower.position.x - 1) * 100}px`, // Позиционирование по оси X
    };

    const handleClick = () => {
        getTowerInfo(tower.position, tower.player, tower.color);
        console.log(tower)

        // Программный вызов клика на клетке
        const cellElement = document.querySelector(`[data-position="${tower.position.x}-${tower.position.y}"]`);
        if (cellElement) {
            cellElement.dispatchEvent(new MouseEvent('click', { bubbles: true }));
        }
    };

    // Определение класса для башни в зависимости от игрока
    const playerClass = tower.player === 1 ? styles.player1 : styles.player2;

    return (
        <div data-type="tower"
             className={isActive ? `${styles.tower} ${playerClass} ${styles.active}` : `${styles.tower} ${playerClass}`}
             style={style}
             onClick={handleClick}></div>
    );
};

