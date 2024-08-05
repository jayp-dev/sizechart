import React, { forwardRef, useState, useEffect } from 'react';
import styles from './SizeChartTable.module.css';
import { Icon } from '@shopify/polaris';

const ContextMenu = forwardRef(({ x, y, options, onClick }, ref) => {
    const [position, setPosition] = useState({ left: x, top: y });

    useEffect(() => {
        const handlePositioning = () => {
            const menuWidth = 250;
            const menuHeight = options.length * 40;

            let newLeft = x;
            let newTop = y;

            if (x + menuWidth > window.innerWidth) {
                newLeft = window.innerWidth - menuWidth - 10;
            }

            if (y + menuHeight > window.innerHeight) {
                newTop = window.innerHeight - menuHeight - 10;
            }
            if (newLeft < 0) {
                newLeft = 10;
            }
            if (newTop < 0) {
                newTop = 10;
            }

            setPosition({ left: newLeft - 150, top: newTop });
        };

        handlePositioning();
    }, [x, y, options.length]);

    return (
        <ul ref={ref} className={styles.contextMenu} style={{ left: `${position.left}px`, top: `${position.top}px` }}>
            {options.map((option, index) => (
                <li key={index} onClick={() => onClick(option)}>
                    <Icon source={option.icon} tone="base" />
                    <span>{option.label}</span>
                </li>
            ))}
        </ul>
    );
});


ContextMenu.displayName = 'ContextMenu';
export default ContextMenu;
