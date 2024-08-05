import React, { useState, useEffect, useRef } from 'react';
import styles from './SizeChartTable.module.css';
import ContextMenu from './ContextMenu';
import { DeleteIcon, ClipboardIcon, DuplicateIcon, PlusCircleIcon } from '@shopify/polaris-icons';

export let links = () => {
    return [{ rel: "stylesheet", href: styles }];
};

const SizeChartTable = ({ handleContentChange, columns, tableData, setColumns, setTableData }) => {
    const [contextMenu, setContextMenu] = useState(null);
    const contextMenuRef = useRef(null);

    const handleSubmit = (event) => {
        event.preventDefault();
        console.log(tableData);
        console.log(JSON.stringify(tableData));
    };

    const handleContextMenu = (event, rowIndex, colIndex) => {
        event.preventDefault();
        setContextMenu({
            x: event.clientX,
            y: event.clientY,
            options: [
                { label: 'Insert row above', action: 'insertRowAbove', icon: PlusCircleIcon },
                { label: 'Insert row below', action: 'insertRowBelow', icon: PlusCircleIcon },
                { label: 'Insert column left', action: 'insertColumnLeft', icon: PlusCircleIcon },
                { label: 'Insert column right', action: 'insertColumnRight', icon: PlusCircleIcon },
                { label: 'Delete row', action: 'deleteRow', icon: DeleteIcon },
                { label: 'Delete column', action: 'deleteColumn', icon: DeleteIcon },
                // { label: 'Copy', action: 'copy', icon: DuplicateIcon },
                // { label: 'Paste', action: 'paste', icon: ClipboardIcon },
            ],
            rowIndex,
            colIndex
        });
    };

    const handleContextMenuClick = (option) => {
        const { rowIndex, colIndex } = contextMenu;

        switch (option.action) {
            case 'insertRowAbove':
                insertRow(rowIndex, 'above');
                break;
            case 'insertRowBelow':
                insertRow(rowIndex, 'below');
                break;
            case 'insertColumnLeft':
                insertColumn(colIndex, 'left');
                break;
            case 'insertColumnRight':
                insertColumn(colIndex, 'right');
                break;
            case 'deleteRow':
                deleteRow(rowIndex);
                break;
            case 'deleteColumn':
                deleteColumn(colIndex);
                break;
            case 'copy':
                copyData(rowIndex, colIndex);
                break;
            case 'paste':
                pasteData(rowIndex, colIndex);
                break;
            default:
                break;
        }

        setContextMenu(null);
    };

    const handleClickOutside = (event) => {
        if (contextMenuRef.current && !contextMenuRef.current.contains(event.target)) {
            setContextMenu(null);
        }
    };

    useEffect(() => {
        if (contextMenu) {
            document.addEventListener('mousedown', handleClickOutside);
        } else {
            document.removeEventListener('mousedown', handleClickOutside);
        }

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [contextMenu]);

    // Insert a row above or below a specific row
    const insertRow = (rowIndex, position) => {
        const newRow = columns.reduce((acc, column) => {
            acc[column] = '';
            return acc;
        }, {});
        const updatedTableData = [...tableData];

        if (position === 'above') {
            updatedTableData.splice(rowIndex, 0, newRow);
        } else if (position === 'below') {
            updatedTableData.splice(rowIndex + 1, 0, newRow);
        }

        setTableData(updatedTableData);
    };

    // Insert a column to the left or right of a specific column
    const insertColumn = (colIndex, position) => {
        const newColumn = '';

        const updatedColumns = [...columns];
        const updatedTableData = [...tableData];

        if (position === 'left') {
            updatedColumns.splice(colIndex, 0, newColumn);
        } else if (position === 'right') {
            updatedColumns.splice(colIndex + 1, 0, newColumn);
        }

        updatedTableData.forEach(row => {
            row[newColumn] = '';
        });

        setColumns(updatedColumns);
        setTableData(updatedTableData);
    };

    // Delete a specific row
    const deleteRow = (rowIndex) => {
        const updatedTableData = [...tableData];
        updatedTableData.splice(rowIndex, 1);
        setTableData(updatedTableData);
    };

    // Delete a specific column
    const deleteColumn = (colIndex) => {
        const columnKey = columns[colIndex];
        const updatedColumns = columns.filter((col, index) => index !== colIndex);
        const updatedTableData = tableData.map(row => {
            const updatedRow = { ...row };
            delete updatedRow[columnKey];
            return updatedRow;
        });

        setColumns(updatedColumns);
        setTableData(updatedTableData);
    };

    // Copy and Paste functionality
    const copyData = (rowIndex, colIndex) => {
        console.log('rowIndex :', rowIndex);
        console.log('colIndex :', colIndex);
        const columnKey = columns[colIndex];
        const copiedValue = tableData[rowIndex][columnKey];
        navigator.clipboard.writeText(copiedValue);
    };

    const pasteData = (rowIndex, colIndex) => {
        const columnKey = columns[colIndex];
        navigator.clipboard.readText().then(pastedValue => {
            const updatedTableData = [...tableData];
            updatedTableData[rowIndex][columnKey] = pastedValue;
            setTableData(updatedTableData);
        });
    };

    return (
        <div className={styles.container}>
            <h2>Dynamic Size Chart</h2>
            <form onSubmit={handleSubmit}>
                <div className={styles.sizedata}>
                    <div className={styles.table}>
                        <div className={styles.thead}>
                            <div className={styles.tr}>
                                {columns.map((column, index) => (
                                    <div
                                        key={index}
                                        className={styles.th}
                                        contentEditable
                                        suppressContentEditableWarning
                                        onBlur={(e) => handleContentChange(e, null, index)}
                                        onContextMenu={(e) => handleContextMenu(e, null, index)}
                                    >
                                        {column}
                                    </div>
                                ))}
                            </div>
                        </div>
                        <div className={styles.tbody}>
                            {tableData.map((row, rowIndex) => (
                                <div key={rowIndex} className={styles.tr}>
                                    {columns.map((column, colIndex) => (
                                        <div
                                            key={colIndex}
                                            className={colIndex === 0 ? styles.th : styles.td}
                                            contentEditable
                                            suppressContentEditableWarning
                                            onBlur={(e) => handleContentChange(e, rowIndex, colIndex)}
                                            onContextMenu={(e) => handleContextMenu(e, rowIndex, colIndex)}
                                        >
                                            {row[column]}
                                        </div>
                                    ))}
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </form>
            {contextMenu && (
                <ContextMenu
                    ref={contextMenuRef}
                    x={contextMenu.x}
                    y={contextMenu.y}
                    options={contextMenu.options}
                    onClick={handleContextMenuClick}
                />
            )}
        </div>
    );
};

export default SizeChartTable;
