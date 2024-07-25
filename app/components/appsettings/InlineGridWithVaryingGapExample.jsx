import { BlockStack, InlineGrid, Box, Text, Image } from "@shopify/polaris";
import CustomPopover from "../CustomPopover";

function InlineGridWithVaryingGapExample({ RowData, colors, updateColor }) {
    const containerStyle = {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        textAlign: 'center',
    };

    const colorCircleStyle = {
        border: '1px solid lightgrey',
        height: '30px',
        width: '30px',
        borderRadius: '50%',
        margin: '10px auto 20px',
        backgroundColor: '#000',
    };

    return (
        <div style={{ width: '100%', height: 'auto' }}>
            <InlineGrid gap="400" columns="4" alignItems="start">
                {RowData.map((item, index) => (
                    <Box key={index} background="bg-surface" borderRadius="50">
                        <BlockStack gap={400} style={containerStyle}>
                            <Text as="p" variant="bodySm" alignment="center">{item.text}</Text>
                            <Image source={item.imageSrc} alt="border" width="100%" />
                            <div style={{ ...colorCircleStyle, backgroundColor: `hsla(${colors[item.id].hue}, ${colors[item.id].saturation * 100}%, ${colors[item.id].brightness * 100}%, 1)` }} className="colorupdate"></div>
                            <CustomPopover
                                label='Select'
                                key={item.id}
                                id={item.id}
                                item={item}
                                color={colors[item.id]}
                                setColor={(newColor) => updateColor(item.id, newColor)}
                            />
                        </BlockStack>
                    </Box>
                ))}
            </InlineGrid>
        </div>
    );
}

export default InlineGridWithVaryingGapExample;
