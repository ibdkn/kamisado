import React from 'react';
import styles from './Board.module.css';
import {Cell} from "../Cell/Cell";
import {Tower} from "../Tower/Tower";

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

type Tower = {
    color: string;
    position: { x: number; y: number };
    player: number;
};

type BoardProps = {
    towers: Tower[];
};

export const Board: React.FC<BoardProps> = ({ towers }) => {
    const renderCells = () => {
        return colors.map((color, index) => (
            <Cell key={index} color={color} />
        ));
    };

    const renderTowers = () => {
        return towers.map((tower, index) => (
            <Tower key={index} color={tower.color} position={tower.position} player={tower.player}/>
        ));
    };

    return (
        <div className={styles.board}>
            {renderCells()}
            {renderTowers()}
        </div>
    );
};
