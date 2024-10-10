import React, { useEffect, useState } from 'react';
import "../../styles/PreviewChart.css";
import { convertColor, convertRowData, formatSizes } from '../../utils/formatSizes';
function PreviewchartTable(props) {
    const { currentUnit, user_chart_data, chartValue, shopSettings } = props;
    const switchUnitEnable = chartValue.allow_converter;
    const decimalPrecision = chartValue.rounding_numOfDecimals;
    const roundingStep = Number(chartValue.rounding_roundTo);
    const converter = chartValue.allow_converter_in === 1 ? 'cm' : 'inch';
    const [chartData, setChartData] = useState([]);
    const tableSettings = {}
    tableSettings.headerColor = convertColor(JSON.parse(shopSettings.headerColor));
    tableSettings.headerFontColor = convertColor(JSON.parse(shopSettings.headerFontColor));
    tableSettings.zebraLinesColor = convertColor(JSON.parse(shopSettings.zebraLinesColor));
    tableSettings.focusColor = convertColor(JSON.parse(shopSettings.focusColor));
    tableSettings.borderStyle = convertColor(shopSettings.borderStyle);

    useEffect(() => {
        const fetchData = async () => {
            let chartData = user_chart_data;
            if (switchUnitEnable) {
                if (converter !== currentUnit) {
                    chartData = await Promise.all(
                        chartData.map(async (row) => await convertRowData(row, currentUnit, decimalPrecision))
                    );
                }
                chartData = await formatSizes(chartData, decimalPrecision, roundingStep);
                setChartData(chartData)
            }
        };
        fetchData(); // Call the inner async function
    }, [user_chart_data, switchUnitEnable, decimalPrecision, roundingStep, currentUnit, converter]);

    return (
        <>
            < GenerateTable chartData={chartData} tableSettings={tableSettings} />
        </>
    )
}

function GenerateTable({ chartData, tableSettings }) {
    // Check if chartData is valid
    if (!chartData || !Array.isArray(chartData) || chartData.length === 0) {
        return <div>No data available</div>;  // Handle empty or undefined chartData
    }

    const { headerColor, headerFontColor, zebraLinesColor, borderStyle } = tableSettings
    // Use JSX to create the table structure
    const headers = Object.keys(chartData[0]); // Use formatted data for headers

    return (
        <div className={`sizechartProTableContainer-root border-${borderStyle}`} id="sizechartProTableContainer-root">
            <div className="sizechartProTableContainer">
                <table className="sizechartProTable-root sizechartProTable-stickyHeader sizechartProTableChart" aria-label="size table">
                    <thead className="sizechartProTableHead-root">
                        <tr className="sizechartProTableRow-root sizechartProTableRow-head">
                            {headers.map((headerText) => (
                                <th
                                    key={headerText}
                                    className={`sizechartProTableCell-root sizechartProTableCell-head sizechartProTableCell-stickyHeader ${headerText === '' ? 'sizechartProTableCell-alignLeft' : 'sizechartProTableCell-alignCenter'
                                        } sizechartProTableCell-sizeMedium`}
                                    scope="col"
                                    style={{ background: headerColor, color: headerFontColor }}
                                >
                                    {headerText}
                                </th>
                            ))}
                        </tr>
                    </thead>
                    <tbody className="sizechartProTableBody-root">
                        {chartData.map((item, index) => (

                            <tr key={index} className="sizechartProTableRow-root" data-index={index + 1} style={{ background: (index + 1) % 2 === 0 ? zebraLinesColor : '' }}>
                                {headers.map((header) => (
                                    <td
                                        key={header}
                                        className="sizechartProTableCell-root sizechartProTableCell-body sizechartProTableCell-sizeMedium"
                                    >
                                        <span className="sizechartPro-cell-text">{item[header] || ''}</span>
                                    </td>
                                ))}
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>

    );
}

export default PreviewchartTable
