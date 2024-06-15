import React from 'react';
import styles from './Cell.module.css';

type CellProps = {
    color: string;
};

export const Cell: React.FC<CellProps> = ({ color }) => {
    return (
        <div className={styles.cell} style={{ backgroundColor: color }}>
            {/* Клетка */}
        </div>
    );
};
