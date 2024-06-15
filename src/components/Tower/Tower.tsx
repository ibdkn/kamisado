import React, {useState} from 'react';
import styles from './Tower.module.css';

// Роль: Отображение башни игрока. Башни перемещаются по игровому полю и взаимодействуют с другими башнями и клетками.
//
// Функции:
// 	•	Отображение башни с заданным цветом и позицией.
// 	•	Обработка событий кликов на башне для возможного выбора башни для перемещения.
// 	•	Рендеринг в правильном месте относительно родительской ячейки.

export type PositionType = {
    x: number;
    y: number
}

export type Tower = {
    color: string
    position: PositionType
    player: number
};

export type TowerProps = {
    tower: Tower,
    getTowerInfo: (towerPosition: PositionType, player: number, towerColor: string) => void
    onTowerClick: (position: PositionType) => void
    isActive: boolean
};

export const Tower = ({tower, getTowerInfo, onTowerClick, isActive}: TowerProps) => {

    const handleClick = () => {
        getTowerInfo(tower.position, tower.player, tower.color);
        onTowerClick(tower.position)

        // Программный вызов клика на клетке
        const cellElement = document.querySelector(`[data-position="${tower.position.x}-${tower.position.y}"]`);
        if (cellElement) {
            cellElement.dispatchEvent(new MouseEvent('click', { bubbles: true }));
        }
    };

    const style = {
        backgroundColor: tower.color,
        top: `${(tower.position.y - 1) * 100}px`, // Позиционирование по оси Y
        left: `${(tower.position.x - 1) * 100}px`, // Позиционирование по оси X
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

