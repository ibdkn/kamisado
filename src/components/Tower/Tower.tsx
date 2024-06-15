import React from 'react';
import styles from './Tower.module.css';

type TowerProps = {
    color: string;
    position: { x: number; y: number };
    player: number;
};

export const Tower: React.FC<TowerProps> = ({ color, position, player }) => {
    const style = {
        backgroundColor: color,
        top: `${position.y * 100}px`, // Позиционирование по оси Y
        left: `${position.x * 100}px`, // Позиционирование по оси X
    };

    // Определение класса для башни в зависимости от игрока
    const playerClass = player === 1 ? styles.player1 : styles.player2;

    return (
        <div className={`${styles.tower} ${playerClass}`} style={style}>
            {/* Фигурка башни */}
        </div>
    );
};
