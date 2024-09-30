import { BlockStack, Box, Card, DropZone, Image, InlineGrid, Text } from "@shopify/polaris"
import { useCallback } from "react";

function InlineDropZone({ OniconChange, icon, validImageTypes = ['image/gif', 'image/jpeg', 'image/png', 'image/svg+xml'], }) {
    const handleDropZoneDrop = useCallback(
        (_dropFiles, acceptedFiles, _rejectedFiles) =>
            OniconChange(acceptedFiles[0]),
        [OniconChange],
    );
    const uploadedFiles = icon && (
        <Box>
            <Image source={
                validImageTypes.includes(icon.type) ? window.URL.createObjectURL(icon) : ''
            } alt={icon.name} style={{ width: '60px', height: '60px', maxHeight: '60px', margin: 'auto' }} />
        </Box>
    );

    return (
        <InlineGrid gap="400" columns={2}>
            <Box paddingBlockStart={200}>
                <Text as="h2" variant="headingSm">Upload Icons </Text>
                <BlockStack gap={500}>
                    <div style={{ width: 80, height: 80 }}>
                        <DropZone onDrop={handleDropZoneDrop} allowMultiple={false} accept={validImageTypes}>
                            <DropZone.FileUpload actionHint="Accepts .gif, .jpg, .png, and .svg files" />
                        </DropZone>
                    </div>
                </BlockStack>
            </Box>
            {icon && (
                <Box paddingBlockStart={200}>
                    <div style={{ width: 100, height: 80 }}>
                        <Card roundedAbove="md">
                            {uploadedFiles}
                        </Card>
                    </div>
                </Box>
            )}

        </InlineGrid>
    )
}

export default InlineDropZone
