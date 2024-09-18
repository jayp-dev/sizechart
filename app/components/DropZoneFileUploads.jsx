import { DropZone, Card, Box, Image, Button, InlineGrid } from '@shopify/polaris';
import { NoteIcon, ImageIcon, ResetIcon } from '@shopify/polaris-icons';
import { useState, useCallback } from 'react';
import { Modal, TitleBar, useAppBridge } from "@shopify/app-bridge-react";

export default function DropZoneFileUploads({
    ismodel,
    file,
    onFileChange,
    onClearEnable = false,
    onClear,
    setSelectImage,
    chartImages,
    selectImage,
    validImageTypes = ['image/gif', 'image/jpeg', 'image/png', 'image/svg+xml'],
    modalTitle = "Select Images",
    previewButtonText = "View Images",
    clearButtonText = "Clear content"
}) {
    const [selectedBoxIndex, setSelectedBoxIndex] = useState(null);

    const handleDropZoneDrop = useCallback(
        (_dropFiles, acceptedFiles, _rejectedFiles) =>
            onFileChange(acceptedFiles[0]),
        [onFileChange],
    );

    const handleBoxClick = (index) => {
        setSelectedBoxIndex(index);

    };



    const shopify = useAppBridge();

    const HandleSaveImage = useCallback(async () => {
        setSelectImage(selectedBoxIndex)
        shopify.modal.hide('PreviewImages')
    }, [selectedBoxIndex, setSelectImage, shopify]);
    const uploadedFiles = file && (
        <Card roundedAbove='sm'>
            <Box>
                <Image source={
                    validImageTypes.includes(file.type) ? window.URL.createObjectURL(file) : NoteIcon
                } alt={file.name} style={{ width: '100%', maxHeight: '100%' }} />
            </Box>
        </Card>
    );

    return (
        <>
            <DropZone onDrop={handleDropZoneDrop} variableHeight allowMultiple={false} type='image' accept={validImageTypes}>
                <DropZone.FileUpload actionHint="Accepts .gif, .jpg, .png, and .svg files" />
            </DropZone>
            {ismodel && (
                <>
                    <Button icon={ImageIcon} onClick={() => shopify.modal.show('PreviewImages')}>{previewButtonText}</Button>
                    <>
                        <Modal id="PreviewImages">
                            <Box padding={400}>
                                <InlineGrid gap="400" columns={3}>
                                    {chartImages.map((image, index) => (
                                        <div key={index}>

                                            <PolarishBox
                                                isSelected={selectedBoxIndex === image.url}
                                                onClick={() => handleBoxClick(image.url)}
                                            >
                                                <Card roundedAbove='sm'>
                                                    <Box>
                                                        <Image source={
                                                            image.url
                                                        } alt={`Size chart_${index}`} style={{ width: '100%', height: '200px' }} />

                                                    </Box>
                                                </Card>
                                            </PolarishBox>

                                        </div>
                                    ))}
                                </InlineGrid>
                            </Box>
                            <TitleBar title={modalTitle}>
                                <button variant="primary" onClick={HandleSaveImage}>Save</button>
                                {/* <button tone='critical'>Delete</button> */}
                            </TitleBar>
                        </Modal>
                    </>

                </>)}


            {selectImage ? (<>
                <Card roundedAbove='sm'>
                    <Box>
                        <Image source={
                            selectImage
                        } alt={''} style={{ width: '100%', maxHeight: '100%' }} />
                    </Box>
                </Card>
            </>) : uploadedFiles}
            {onClearEnable && (
                <Button
                    onClick={onClear}
                    icon={ResetIcon}
                    tone="critical"
                    accessibilityLabel="Clear content"
                >
                    {clearButtonText}
                </Button>
            )}

        </>
    );
}

const PolarishBox = ({ children, isSelected, onClick }) => {
    return (
        <div
            className='Polaris-Box'
            onClick={onClick}
            style={{
                border: isSelected ? '2px solid rgb(92, 106, 196)' : 'none',
                cursor: 'pointer',
                backgroundColor: isSelected ? 'rgb(244, 246, 248)' : 'transparent'
            }}
        >
            {children}
        </div>
    );
};


