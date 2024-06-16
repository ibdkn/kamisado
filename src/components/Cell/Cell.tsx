import React from 'react';
import styles from './Cell.module.css';
import {PositionType} from "../Tower/Tower";

// Роль:
// Отображение одной клетки на игровом поле. Это компонента-ячейка, которая будет содержать информацию о цвете и позиции на доске.
//
// Функции:
// 	•	Отображение клетки с заданным цветом.
// 	•	Прием событий кликов и передача их вверх по цепочке для обработки.
// 	•	Поддержка отображения башен, если они находятся в этой ячейке.

type CellProps = {
    position: PositionType
    color: string
    getCellInfo: (cellPosition: PositionType, cellColor: string) => void
    possibleWay: PositionType[] | null
};

export const Cell = ({ position, color, getCellInfo, possibleWay }: CellProps) => {
    const isPossibleWay = possibleWay?.some(way => way.x === position.x && way.y === position.y);
    const handleClick = () => {
        getCellInfo(position, color);

        console.log('CELL: ', position)
    };

    return (
        <div data-position={`${position.x}-${position.y}`}
             className={isPossibleWay ? `${styles.cell} ${styles.active}` : styles.cell}
             style={{ backgroundColor: color }}
             onClick={handleClick}>
        </div>
    );
};
