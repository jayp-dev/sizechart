
import { useState } from 'react';
import { BlockStack, Card, Grid, Text } from "@shopify/polaris";
import InlineGridWithVaryingGapExample from '../appsettings/InlineGridWithVaryingGapExample';

function SizechartColors() {
    const [colors, setColors] = useState({
        Header: { hue: 300, brightness: 1, saturation: 0.7 },
        Header_font: { hue: 300, brightness: 1, saturation: 0.7 },
        Zebra_lines: { hue: 300, brightness: 1, saturation: 0.7 },
        Focus: { hue: 300, brightness: 1, saturation: 0.7 }
    });

    const updateColor = (id, newColor) => {
        setColors((prevColors) => ({
            ...prevColors,
            [id]: newColor
        }));
    };

    const RowData = [
        { id: 'Header', text: 'Header', imageSrc: '/assets/images/color_header.svg' },
        { id: 'Header_font', text: 'Header font', imageSrc: '/assets/images/color_font_header.svg' },
        { id: 'Zebra_lines', text: 'Zebra lines', imageSrc: '/assets/images/color_zebra.svg' },
        { id: 'Focus', text: 'Focus', imageSrc: '/assets/images/color_focus.svg' },
    ];

    return (
        <Grid.Cell columnSpan={{ xs: 6, sm: 4, md: 4, lg: 11, xl: 12 }}>
            <Card roundedAbove="sm">
                <BlockStack gap="500">
                    <Text as="h2" variant="headingSm">Size chart color</Text>
                    <InlineGridWithVaryingGapExample RowData={RowData} colors={colors} updateColor={updateColor} />
                </BlockStack>
            </Card>
        </Grid.Cell>
    );
}

export default SizechartColors;
