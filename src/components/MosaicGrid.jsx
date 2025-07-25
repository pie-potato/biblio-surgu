import React from 'react';
import styles from '../styles/MosaicGrid.module.css';

const MosaicGrid = ({ children, type = 'news', className = "" }) => { // type: news, additions
    const gridClass = type === 'additions' ? styles.additionsGrid : styles.newsGrid;
    return (
        <div className={`${className} ${styles.mosaicGrid} ${gridClass}`}>
            {children}
        </div>
    );
};

export default MosaicGrid;