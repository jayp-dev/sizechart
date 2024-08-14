// import { DropZone, Card, Box, Image, Button, InlineGrid } from '@shopify/polaris';
// import { NoteIcon, ImageIcon, ResetIcon } from '@shopify/polaris-icons';
// import { useState, useCallback } from 'react';
// import { Modal, TitleBar } from "@shopify/app-bridge-react";

// export default function DropZoneFileUploads() {
//     const [file, setFile] = useState(null);
//     const [selectedBoxIndex, setSelectedBoxIndex] = useState(null);

//     const handleDropZoneDrop = useCallback(
//         (_dropFiles, acceptedFiles, _rejectedFiles) =>
//             setFile(acceptedFiles[0]),
//         [],
//     );

//     const handleBoxClick = (index) => {
//         setSelectedBoxIndex(index);
//     };

//     const validImageTypes = ['image/gif', 'image/jpeg', 'image/png', 'image/svg+xml'];

//     const uploadedFiles = file && (
//         <Card roundedAbove='sm'>
//             <Box>
//                 <Image source={
//                     validImageTypes.includes(file.type) ? window.URL.createObjectURL(file) : NoteIcon
//                 } alt={file.name} style={{ width: '100%', maxHeight: '100%' }} />
//             </Box>
//         </Card>
//     );

//     return (
//         <>
//             <DropZone onDrop={handleDropZoneDrop} variableHeight allowMultiple={false} type='image' accept={validImageTypes}>
//                 <DropZone.FileUpload actionHint="Accepts .gif, .jpg, .png .webp and .svg files" />
//             </DropZone>
//             <Button icon={ImageIcon} onClick={() => shopify.modal.show('PreviewImages')}>View Images</Button>

//             <Modal id="PreviewImages">
//                 <Box padding={400}>
//                     <InlineGrid gap="400" columns={3}>
//                         {[0, 1, 2].map((index) => (
//                             <div key={index}>
//                                 {file && (
//                                     <PolarishBox
//                                         key={index}
//                                         isSelected={selectedBoxIndex === index}
//                                         onClick={() => handleBoxClick(index)}
//                                     >
//                                         <Card roundedAbove='sm'>
//                                             <Box>
//                                                 {file && (
//                                                     <Image source={
//                                                         validImageTypes.includes(file.type) ? window.URL.createObjectURL(file) : NoteIcon
//                                                     } alt={file.name} style={{ width: '100%', height: 'auto' }} />
//                                                 )}
//                                             </Box>
//                                         </Card>
//                                     </PolarishBox>
//                                 )}</div>

//                         ))}
//                     </InlineGrid>
//                 </Box>
//                 <TitleBar title="Select Images">
//                     <button variant="primary">Select</button>
//                     <button tone='critical' onClick={() => shopify.modal.hide('PreviewImages')}>Delete</button>
//                 </TitleBar>
//             </Modal>
//             {uploadedFiles}

//             <Button
//                 onClick={() => { }}
//                 icon={ResetIcon}
//                 tone="critical"
//                 accessibilityLabel="Clear content"
//             >
//                 Clear content
//             </Button>
//         </>
//     );
// }

// const PolarishBox = ({ children, isSelected, onClick }) => {
//     return (
//         <div
//             className='Polaris-Box'
//             onClick={onClick}
//             style={{
//                 border: isSelected ? '2px solid rgb(92, 106, 196)' : 'none',
//                 cursor: 'pointer',
//                 backgroundColor: isSelected ? 'rgb(244, 246, 248)' : 'transparent'
//             }}
//         >
//             {children}
//         </div>
//     );
// };


import { DropZone, Card, Box, Image, Button, InlineGrid } from '@shopify/polaris';
import { NoteIcon, ImageIcon, ResetIcon } from '@shopify/polaris-icons';
import { useState, useCallback } from 'react';
import { Modal, TitleBar } from "@shopify/app-bridge-react";

export default function DropZoneFileUploads({
    ismodel,
    file,
    onFileChange,
    onClear,
    onSelect,
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

                    <Modal id="PreviewImages">
                        <Box padding={400}>
                            <InlineGrid gap="400" columns={3}>
                                {[0, 1, 2].map((index) => (
                                    <div key={index}>
                                        {file && (
                                            <PolarishBox
                                                isSelected={selectedBoxIndex === index}
                                                onClick={() => handleBoxClick(index)}
                                            >
                                                <Card roundedAbove='sm'>
                                                    <Box>
                                                        {file && (
                                                            <Image source={
                                                                validImageTypes.includes(file.type) ? window.URL.createObjectURL(file) : NoteIcon
                                                            } alt={file.name} style={{ width: '100%', height: 'auto' }} />
                                                        )}
                                                    </Box>
                                                </Card>
                                            </PolarishBox>
                                        )}
                                    </div>
                                ))}
                            </InlineGrid>
                        </Box>
                        <TitleBar title={modalTitle}>
                            <Button onClick={onSelect} variant="primary">Select</Button>
                            <Button tone='critical' onClick={() => shopify.modal.hide('PreviewImages')}>Delete</Button>
                        </TitleBar>
                    </Modal>
                </>)}
            {uploadedFiles}

            <Button
                onClick={onClear}
                icon={ResetIcon}
                tone="critical"
                accessibilityLabel="Clear content"
            >
                {clearButtonText}
            </Button>
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


