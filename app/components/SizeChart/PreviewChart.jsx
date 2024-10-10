import { Modal, TitleBar } from '@shopify/app-bridge-react';
import { useCallback, useEffect, useMemo, useState } from "react";
import "../../styles/PreviewChart.css";
import PreviewchartTable from './PreviewchartTable';
import Button from './Button';

function PreviewChart({ PreviewEnable, setPreviewEnable, chartValue, tableData, shopSettings }) {
    const [currentUnit, setCurrentUnit] = useState(chartValue.allow_converter_in)
    const [modalOpen, setModalOpen] = useState(false);
    const handleHide = () => {
        setModalOpen(false);
        setPreviewEnable(false)
    };

    useEffect(() => {
        if (PreviewEnable) {
            setModalOpen(PreviewEnable);
        }
        if (!chartValue) {
            setCurrentUnit(chartValue.allow_converter_in);
        }

    }, [PreviewEnable, chartValue, tableData])

    const handleUnitClick = useCallback(async (unit) => {
        if (unit)
            setCurrentUnit((prev) => unit)
    }, [])

    // Memoizing dynamicProps to avoid it changing on every render
    const dynamicProps = useMemo(() => {
        const props = {};
        if (chartValue) {
            props.currentUnit = (currentUnit === 1 || chartValue.allow_converter_in === 1) ? 'cm' : 'inch';
            props.user_chart_data = tableData;
            props.chartValue = chartValue;
            props.shopSettings = shopSettings;
        }
        return props;
    }, [chartValue, tableData, currentUnit, shopSettings]);

    return (
        <>
            <div style={{ height: '500px' }} className="preview-chart">
                <Modal id="my-modal" open={modalOpen}
                    onHide={handleHide} variant='max'>
                    <div role="presentation" className={`sizechartProModal-root sizechartProDialog-root ${chartValue.image ? '' : 'no-root-image'}`} id="sizechartProModal">

                        <div id="sizechartProDialog-container" className="sizechartProDialog-container sizechartProDialog-scrollPaper"
                            role="presentation" tabIndex="-1">
                            <div className="sizechartProPaper-root" role="dialog" aria-describedby="modal-modal-description" aria-labelledby="modal-modal-title">
                                <div className="sizechartPro-dialog" id="sizechartPro-dialog">
                                    <div className="sizechartPro-content" id="dialogsize">
                                        <div className="sizechartProBox-root">
                                            <div className="sizechartPro_title">
                                                <div className="sizechartProTypography-root sizechartProTypography-h6 sizechartProTypography">
                                                    <p style={{ color: 'red', marginBottom: "20px" }}>To see the final result, please visit your store. This preview serves as a reference</p>
                                                    {chartValue.name || ''}
                                                </div>
                                            </div>
                                            <div className="sizechartProTypography-root sizechartPro-product-title">
                                                <div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="maintable-root srcoll-root">
                                            <div className="sizechartPro-content layout">
                                                <div className="sizechartPro-layout">
                                                    <div className="sizechartPro-sizetable-container">
                                                        <div className="sizechartProBox-root">
                                                            {chartValue.allow_converter == 'true' && (
                                                                <div className="sizechartProBox-root">
                                                                    <div className="sizechartProTabs-root">
                                                                        <div className="sizechartProTabs-scroller sizechartProTabs-fixed"
                                                                            id="sizechartProCovertButton-root">
                                                                            <div>
                                                                                <div aria-label="basic tabs example" className="sizechartProTabs-flexContainer" role="tablist">
                                                                                    <Button
                                                                                        id="cmButton"
                                                                                        className={`sizechartProButtonBase-root  sizechartProTab-root sizechartProTab-textColorPrimary ${currentUnit === 1 && 'active'}`} tabIndex="0"
                                                                                        type="button" role="tab" aria-controls="simple-tabpanel-0"
                                                                                        onClick={() => handleUnitClick(1)}
                                                                                    >CM</Button>
                                                                                    <Button
                                                                                        id="inchButton"
                                                                                        className={`sizechartProButtonBase-root  sizechartProTab-root sizechartProTab-textColorPrimary ${currentUnit === 2 && 'active'}`} tabIndex="0"
                                                                                        type="button" role="tab" aria-controls="simple-tabpanel-0"
                                                                                        onClick={() => handleUnitClick(2)}>INCHES</Button>
                                                                                </div>
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            )}

                                                            <PreviewchartTable {...dynamicProps} />

                                                        </div>
                                                    </div>

                                                    <div className="image-container">
                                                        {chartValue.image ? (
                                                            <img src={chartValue.image} alt={chartValue.name || ''} className="right-image" />
                                                        ) : ''}

                                                    </div>
                                                </div>

                                                <div className="table_measurement-root" id="tableMeasurement">
                                                    <div className="sizeTablehtmlContent-root" dangerouslySetInnerHTML={{ __html: chartValue.content }} >
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <TitleBar title={'Preview of Your Size Chart'}>
                    </TitleBar>
                </Modal>
            </div>
        </>
    );
}

export default PreviewChart;
